const path = require('path')
const fs = require('fs')
const readlineSync = require('readline-sync')
const concurrently = require('concurrently')

/**
 * Docs are at /docs/cli.md
 */

const appPaths = {
  fundamentals: path.resolve(__dirname, '..', 'apps', 'YesterTech'),
  electives: path.resolve(__dirname, '..', 'apps', 'YesterTech'),
  // Unless we want advanced to have it's own app
  advanced: path.resolve(__dirname, '..', 'apps', 'YesterTech')
}

module.exports = function() {
  console.clear()

  // Are we trying to choose an app or a lesson to load
  const { appPath, alias } = process.argv[2] === 'app' ? { appPath: getAppPath() } : selectLesson()

  /**
   * Does the app use a json-server database
   */
  let dbPath = path.resolve(appPath, 'database', 'db.json')
  let dbPathAlt = path.resolve(appPath, 'database', 'db.js')
  dbPath = fs.existsSync(dbPath) ? dbPath : fs.existsSync(dbPathAlt)

  // This allows the database to run in the background
  if (dbPath) {
    concurrently([
      {
        command: `json-server --watch ${dbPath} -p 3333 --quiet`,
        name: 'json-server database'
      }
    ]).catch(err => {
      console.error("JSON-SERVER was not able to start, or it's process was manually killed.\n\n")
      console.error(err)
      process.exit(1)
    })
  }

  return {
    appEntry: path.resolve(appPath, 'entry.js'),
    alias: alias || {}
  }
}

/****************************************
  Select Lesson
*****************************************/

function selectLesson() {
  /**
   * Load Preferences
   */
  const preferencesPath = path.resolve(__dirname, '..', 'preferences.json')
  let preferences = {}
  try {
    const data = fs.readFileSync(preferencesPath, 'utf8')
    preferences = JSON.parse(data)
  } catch (err) {
    // no-op
  }

  /**
   * Choose a Course and Lesson
   */

  let selectedCourse
  let selectedLesson

  // So we can start over with course selection
  while (!selectedLesson) {
    console.clear()

    /**
     * Course Selection
     */

    // Read course options and make list
    const coursesPath = path.resolve(__dirname, '..', 'courses')
    const courseOptions = fs.readdirSync(coursesPath).filter(item => {
      return fs.lstatSync(path.resolve(coursesPath, item)).isDirectory()
    })

    // See if the user made a pre-selection in cli: `npm start fundamentals`
    // or if they have one listed in their `preferences.json` file
    if (courseOptions.includes(process.argv[2])) {
      selectedCourse = process.argv[2]
    } else if (preferences.course && courseOptions.includes(preferences.course)) {
      selectedCourse = preferences.course
      console.log(
        `Using the "${selectedCourse}" course as specified in preferences.json. To run a different course, remove that file or select it with the CLI: npm start advanced\n`
      )
    }

    // If nothing was found from above, show a menu so they can choose
    if (!selectedCourse) {
      console.log('Which Course?')
      const choice = readlineSync.keyInSelect(courseOptions)
      if (choice === -1) {
        process.exit(0)
      }
      selectedCourse = courseOptions[choice]
    }

    // See if they want to save their choice to `preferences.json`
    if (!preferences.course) {
      if (readlineSync.keyInYN('\nDo you want us to remember this course selection?')) {
        try {
          fs.writeFileSync(
            preferencesPath,
            JSON.stringify({ ...preferences, course: selectedCourse }, null, 2)
          )
          console.log('\nPreferences are saved in `preferences.json`')
        } catch (err) {
          console.error(`\nCould not save preferences to ${preferencesPath}`)
        }
      }
    }

    /**
     * Lesson Selection
     */

    // Read lesson options and make a list
    const lessonsPath = path.resolve(__dirname, '..', `courses/${selectedCourse}`)
    const lessonOptions = fs.readdirSync(lessonsPath).filter(item => {
      return fs.lstatSync(path.resolve(lessonsPath, item)).isDirectory()
    })
    if (lessonOptions.length === 0) {
      console.log(`\nThere are no lessons in ${selectedCourse}`)
      process.exit(0)
    }

    // Lesson arg would always be the last arg
    const selectedLessonArg = process.argv[process.argv.length - 1]
    const selectByOptionWord = lessonOptions.find(lesson => {
      const regex = new RegExp(selectedLessonArg, 'i')
      return regex.test(lesson)
    })

    // See the third or fourth cli argument was meant to be a selectedOption by number
    // This is for doing `npm start fundamentals 2` or `npm start 2` (assuming they have preferences for course)
    if (!isNaN(selectedLessonArg) && lessonOptions[selectedLessonArg - 1]) {
      selectedLesson = lessonOptions[selectedLessonArg - 1]

      // Or they can do `npm start fundamentals state` or `npm start state` (assuming they have preferences for course)
    } else if (selectByOptionWord) {
      selectedLesson = selectByOptionWord

      // Show Menu
    } else {
      console.log(`\nWhich Lesson of ${selectedCourse}?`)
      const modifiedLessonOptions = lessonOptions.concat(['FULL APP', 'BACK TO COURSE SELECTION'])
      const choice = readlineSync.keyInSelect(modifiedLessonOptions)
      if (choice === -1) {
        process.exit(0)
      } else if (modifiedLessonOptions[choice] === 'FULL APP') {
        return { appPath: appPaths[selectedCourse] }
      } else if (modifiedLessonOptions[choice] === 'BACK TO COURSE SELECTION') {
        preferences.course = null
        selectedCourse = null
        // Starts CLI menu over
        continue
      } else {
        selectedLesson = modifiedLessonOptions[choice]
      }
    }
  }

  /**
   * Exercise or Lecture
   */

  const selectedLessonType = [process.argv[2], process.argv[3], process.argv[4]].includes('lecture')
    ? 'lecture'
    : 'exercise'

  const lessonPath = path.resolve(
    __dirname,
    '..',
    'courses',
    selectedCourse,
    selectedLesson,
    selectedLessonType
  )

  // See if path doesn't exist
  if (!fs.existsSync(lessonPath)) {
    console.error(
      `\nWe can't find this ${selectedLessonType}. Maybe \`${selectedLesson}\` doesn't have a ${selectedLessonType}?`
    )
    console.error(`Check this path: ${lessonPath}\n\n`)
    process.exit(0)
  }

  const alias = {}
  fs.readdirSync(lessonPath).forEach(file => {
    const name = path.basename(file, '.js')
    alias[`YesterTech/${name}`] = path.join(lessonPath, file)
  })

  return { appPath: appPaths[selectedCourse], alias }
}

/****************************************
  Get appPath
*****************************************/

function getAppPath() {
  const appsPath = path.resolve(__dirname, '..', `apps`)
  const appOptions = fs.readdirSync(appsPath).filter(item => {
    return fs.lstatSync(path.resolve(appsPath, item)).isDirectory()
  })

  /**
   * Select which app
   */
  let selectedApp
  if (appOptions.length === 1) {
    selectedApp = appOptions[0]
  } else {
    console.log(`\nWhich App?`)
    const choice = readlineSync.keyInSelect(appOptions)
    if (choice === -1) {
      process.exit(0)
    }
    selectedApp = appOptions[choice]
  }

  /**
   * App Path
   */
  const appPath = path.resolve(__dirname, '..', 'apps', selectedApp)
  return appPath
}
