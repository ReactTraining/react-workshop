const path = require('path')
const fs = require('fs')
const readlineSync = require('readline-sync')

/**
 * CLI Docs are at /docs/cli.md
 */

// Which App does each curriculum get its files from:
const courseAppNames = {
  'advanced-composition': 'YesterTech',
  'advanced-hooks': 'YesterTech',
  'core-v1': 'YesterTech',
  'core-v2': 'ProjectPlanner',
  electives: 'YesterTech',
  'composition-patterns': 'YesterTech',
}

function getCourseAppPath(courseName) {
  return path.resolve(__dirname, '..', 'apps', courseAppNames[courseName])
}

module.exports = function () {
  console.clear()

  // Are we trying to choose an app or a lesson to load
  const { appPath, alias, selectedCourse, selectedLessonType, selectedLesson } =
    process.argv[2] === 'app' ? { appPath: getAppPath() } : selectLesson()

  return {
    appPath,
    alias: alias || {},
    selectedCourse,
    selectedLessonType,
    selectedLesson,
  }
}

/****************************************
  Select Lesson
*****************************************/

let askedToRemember = false

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
  let selectedLessonType

  // So we can start over with course selection
  while (!selectedLesson) {
    console.clear()

    /**
     * Course Selection
     */

    // Read course options and make list
    const coursesPath = path.resolve(__dirname, '..', 'courses')
    const courseOptions = fs.readdirSync(coursesPath).filter((item) => {
      return fs.lstatSync(path.resolve(coursesPath, item)).isDirectory()
    })

    // See if the user made a pre-selection in cli: `npm start core`
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
    if (!preferences.course && !askedToRemember) {
      askedToRemember = true
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
    const lessonOptions = fs.readdirSync(lessonsPath).filter((item) => {
      return fs.lstatSync(path.resolve(lessonsPath, item)).isDirectory()
    })
    if (lessonOptions.length === 0) {
      console.log(`\nThere are no lessons in ${selectedCourse}`)
      process.exit(0)
    }

    // Lesson arg would always be the last arg
    const selectedLessonArg = process.argv[process.argv.length - 1]
    const selectByOptionWord = lessonOptions.find((lesson) => {
      const regex = new RegExp(selectedLessonArg, 'i')
      return regex.test(lesson)
    })

    // See the third or fourth cli argument was meant to be a selectedOption by number
    // This is for doing `npm start core 2` or `npm start 2` (assuming they have preferences for course)
    if (!isNaN(selectedLessonArg) && lessonOptions[selectedLessonArg - 1]) {
      selectedLesson = lessonOptions[selectedLessonArg - 1]

      // Or they can do `npm start core state` or `npm start state` (assuming they have preferences for course)
    } else if (selectByOptionWord) {
      selectedLesson = selectByOptionWord

      // Show Menu
    } else {
      console.clear()
      console.log(`\nWhich lesson of ${selectedCourse}?`)
      const modifiedLessonOptions = lessonOptions.concat([
        'FULL APP',
        '👈 BACK TO COURSE SELECTION',
      ])
      const choice = readlineSync.keyInSelect(modifiedLessonOptions)
      if (choice === -1) {
        process.exit(0)
      } else if (modifiedLessonOptions[choice] === 'FULL APP') {
        return { appPath: getCourseAppPath(selectedCourse) }
      } else if (modifiedLessonOptions[choice] === '👈 BACK TO COURSE SELECTION') {
        preferences.course = null
        selectedCourse = null
        // Starts CLI menu over
        continue
      } else {
        selectedLesson = modifiedLessonOptions[choice]
      }
    }

    /**
     * Lesson type
     */

    const lessonTypesPath = path.resolve(
      __dirname,
      '..',
      `courses/${selectedCourse}/${selectedLesson}`
    )
    const lessonTypeOptions = fs.readdirSync(lessonTypesPath).filter((item) => {
      return fs.lstatSync(path.resolve(lessonTypesPath, item)).isDirectory()
    })
    if (lessonTypeOptions.length === 0) {
      console.log(`\nThere are no exercises or lectures in ${selectedLesson}`)
      process.exit(0)
    }

    console.clear()
    console.log(`\nWhich lesson type of ${selectedLesson}?`)
    const modifiedLessonTypeOptions = lessonTypeOptions.concat(['👈 BACK TO LESSON SELECTION'])
    const choice = readlineSync.keyInSelect(modifiedLessonTypeOptions)
    if (choice === -1) {
      process.exit(0)
    } else if (modifiedLessonTypeOptions[choice] === '👈 BACK TO LESSON SELECTION') {
      selectedLesson = null
      // Starts CLI menu over
      continue
    } else {
      selectedLessonType = modifiedLessonTypeOptions[choice]
    }
  }

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
  const aliasBasePath = `${courseAppNames[selectedCourse]}`
  fs.readdirSync(lessonPath).forEach((file) => {
    const name = path.basename(file).replace(/\.(js|ts|tsx)$/, '')
    alias[path.join(aliasBasePath, name)] = path.join(lessonPath, file)
  })

  return {
    appPath: getCourseAppPath(selectedCourse),
    alias,
    selectedCourse,
    selectedLessonType,
    selectedLesson,
  }
}

/****************************************
  Get appPath
*****************************************/

function getAppPath() {
  const appsPath = path.resolve(__dirname, '..', `apps`)
  const appOptions = fs.readdirSync(appsPath).filter((item) => {
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
