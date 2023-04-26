const path = require('path')
const fs = require('fs')
const readlineSync = require('readline-sync')

const FULL_APP = 'FULL APP'
exports.selectReactLesson = selectReactLesson

/****************************************
  Select React Lesson
*****************************************/

function selectReactLesson(coursesPath, preferences, savePreferences) {
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
    let courseOptions = fs.readdirSync(coursesPath).filter((item) => {
      return fs.lstatSync(path.resolve(coursesPath, item)).isDirectory() && !item.startsWith('_')
    })

    // If they have one listed in their `preferences.json` file
    if (preferences.course && courseOptions.includes(preferences.course)) {
      selectedCourse = preferences.course
      console.log(`Using the "${selectedCourse}" course as specified in preferences.json`)
    }

    // If nothing was found from above, show a menu so they can choose
    if (!selectedCourse) {
      console.log('Which Course?')
      courseOptions = [...courseOptions, FULL_APP]
      const choice = readlineSync.keyInSelect(courseOptions)
      if (choice === -1) {
        process.exit(0)
      } else if (courseOptions[choice] === FULL_APP) {
        // EXIT and run full app
        return {}
      }
      selectedCourse = courseOptions[choice]
    }

    savePreferences({ course: selectedCourse })

    /**
     * Lesson Selection
     */

    // Read lesson options and make a list
    const lessonsPath = path.resolve(coursesPath, selectedCourse)
    let lessonOptions = fs.readdirSync(lessonsPath).filter((item) => {
      return fs.lstatSync(path.resolve(lessonsPath, item)).isDirectory()
    })
    if (lessonOptions.length === 0) {
      console.log(`\nThere are no lessons in ${selectedCourse}`)
      process.exit(0)
    }

    // console.clear()
    console.log(`\nWhich lesson of ${selectedCourse}?`)

    lessonOptions = [...lessonOptions, FULL_APP, '<-- BACK TO COURSE SELECTION']
    let choice = readlineSync.keyInSelect(lessonOptions)

    if (choice === -1) {
      // EXIT
      process.exit(0)
    } else if (lessonOptions[choice] === FULL_APP) {
      // EXIT and run full app
      return {}
    } else if (lessonOptions[choice] === '<-- BACK TO COURSE SELECTION') {
      preferences.course = null
      selectedCourse = null
      // Starts CLI menu over
      continue
    } else {
      selectedLesson = lessonOptions[choice]
    }

    /**
     * Lesson type
     */

    const lessonTypesPath = path.resolve(coursesPath, selectedCourse, selectedLesson)
    const lessonTypeOptions = fs.readdirSync(lessonTypesPath).filter((item) => {
      return fs.lstatSync(path.resolve(lessonTypesPath, item)).isDirectory()
    })
    if (lessonTypeOptions.length === 0) {
      console.log(`\nThere are no exercises or lectures in ${selectedLesson}`)
      process.exit(0)
    }

    console.clear()
    console.log(`\nWhich lesson type of ${selectedLesson}?`)
    const modifiedLessonTypeOptions = lessonTypeOptions.concat(['<-- BACK TO LESSON SELECTION'])
    choice = readlineSync.keyInSelect(modifiedLessonTypeOptions)
    if (choice === -1) {
      process.exit(0)
    } else if (modifiedLessonTypeOptions[choice] === '<-- BACK TO LESSON SELECTION') {
      selectedLesson = null
      // Starts CLI menu over
      continue
    } else {
      selectedLessonType = modifiedLessonTypeOptions[choice]
    }
  }

  const lessonPath = path.resolve(coursesPath, selectedCourse, selectedLesson, selectedLessonType)

  // See if path doesn't exist
  if (!fs.existsSync(lessonPath)) {
    console.error(
      `\nWe can't find this ${selectedLessonType}. Maybe \`${selectedLesson}\` doesn't have a ${selectedLessonType}?`
    )
    console.error(`Check this path: ${lessonPath}\n\n`)
    process.exit(0)
  }

  return {
    selectedLessonType,
    selectedLesson,
    lessonPath,
  }
}
