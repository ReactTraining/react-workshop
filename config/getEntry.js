const path = require('path')
const fs = require('fs')
const readlineSync = require('readline-sync')
const concurrently = require('concurrently')

const preferencesPath = path.resolve(__dirname, '..', 'preferences.json')

function getEntry() {
  console.clear()
  let preferences = {}
  try {
    const data = fs.readFileSync(preferencesPath, 'utf8')
    preferences = JSON.parse(data)
  } catch (err) {
    // noop
  }

  /**
   * Course Selection
   */

  const coursesPath = path.resolve(__dirname, '..', 'courses')
  const courseOptions = fs.readdirSync(coursesPath).filter(item => {
    return fs.lstatSync(path.resolve(coursesPath, item)).isDirectory()
  })

  let selectedCourse = null
  if (courseOptions.includes(process.argv[2])) {
    selectedCourse = process.argv[2]
  } else if (preferences.course && courseOptions.includes(preferences.course)) {
    selectedCourse = preferences.course
    console.log(
      `Using course from preferences.json. Remove that file to choose a difference course or select with CLI: npm start advanced\n`
    )
  }

  if (!selectedCourse) {
    console.log('Which Course?')
    const choice = readlineSync.keyInSelect(courseOptions)
    if (choice === -1) {
      process.exit(0)
    }
    selectedCourse = courseOptions[choice]
  }

  /**
   * Remember Choice for Course
   */

  if (!preferences.course) {
    if (readlineSync.keyInYN('\nDo you want us to remember this course selection?')) {
      try {
        fs.writeFileSync(
          preferencesPath,
          JSON.stringify({ ...preferences, course: selectedCourse }, null, 2)
        )
      } catch (err) {
        console.error(`\nCould not save preferences to ${preferencesPath}`)
      }
    }
  }

  /**
   * Lesson Selection
   */
  let selectedLesson = process.argv[3]

  const lessonsPath = path.resolve(__dirname, '..', `courses/${selectedCourse}`)
  const lessonOptions = fs.readdirSync(lessonsPath).filter(item => {
    return fs.lstatSync(path.resolve(lessonsPath, item)).isDirectory()
  })
  if (lessonOptions.length === 0) {
    console.log(`\nThere are no lessons in ${selectedCourse}`)
    process.exit(0)
  }

  // Allow pre-selection from cli: `npm start advanced 4`
  if (!isNaN(selectedLesson) && lessonOptions.length <= selectedLesson) {
    selectedLesson = lessonOptions[selectedLesson - 1]
    // Otherwise, if they
  } else if (!lessonOptions.includes(selectedLesson)) {
    console.log(`\nWhich Lesson of ${selectedCourse}?`)
    const choice = readlineSync.keyInSelect(lessonOptions)
    if (choice === -1) {
      process.exit(0)
    }
    selectedLesson = lessonOptions[choice]
  }

  /**
   * Exercise or Lecture Selection
   * Choose `exercise` unless they specify `lecture` in the CLI
   * But only use that logic if the lesson starts with a number. In other words,
   * We don't want to have to do `app/exercise/stuff` when we can just do `app/stuff`
   */

  let selectedLessonVersion = ''

  if (!isNaN(selectedLesson.substr(0, 2))) {
    const options = [process.argv[2], process.argv[3], process.argv[4]]
    selectedLessonVersion = options.includes('lecture') ? 'lecture' : 'exercise'
  }

  /**
   * Root Path
   */
  const rootPath = path.resolve(
    __dirname,
    '..',
    'courses',
    selectedCourse,
    selectedLesson,
    selectedLessonVersion
  )

  /**
   * See if we need to load a database
   */
  let dbPath = path.resolve(rootPath, 'database', 'db.json')
  let dbPathAlt = path.resolve(rootPath, 'database', 'db.js')
  dbPath = fs.existsSync(dbPath) ? dbPath : fs.existsSync(dbPathAlt)

  if (dbPath) {
    concurrently([
      {
        command: `json-server --watch ${dbPath} -p 3333 --quiet`,
        name: 'json-server database',
      },
    ]).catch(err => {
      console.error('JSON Server Error\n\n', err)
      process.exit(1)
    })
  }

  /**
   * Entry
   */
  const entry = path.resolve(
    __dirname,
    '..',
    'courses',
    selectedCourse,
    selectedLesson,
    selectedLessonVersion,
    'index.js'
  )

  return entry
}

module.exports = getEntry
