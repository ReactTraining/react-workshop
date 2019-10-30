const path = require("path")
const fs = require("fs")
const readlineSync = require("readline-sync")

const preferencesPath = path.resolve(__dirname, "..", "preferences.json")

function getEntry() {
  let preferences = {}
  try {
    const data = fs.readFileSync(preferencesPath, "utf8")
    preferences = JSON.parse(data)
  } catch (err) {
    // noop
  }

  /**
   * Course Selection
   */

  const coursesPath = path.resolve(__dirname, "..", "courses")
  const courseOptions = fs.readdirSync(coursesPath).filter(item => {
    return fs.lstatSync(path.resolve(coursesPath, item)).isDirectory()
  })

  let selectedCourse = courseOptions.includes(process.argv[2])
    ? process.argv[2]
    : preferences.course

  if (!selectedCourse) {
    console.clear()
    console.log("Which Course?")
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
    if (readlineSync.keyInYN("Do you want us to remember this course selection?")) {
      try {
        fs.writeFileSync(
          preferencesPath,
          JSON.stringify({ ...preferences, course: selectedCourse }, null, 2)
        )
      } catch (err) {
        console.error(`Could not save preferences to ${preferencesPath}`)
      }
    }
  }

  /**
   * Lesson Selection
   */
  let selectedLesson = process.argv[3]

  const lessonsPath = path.resolve(__dirname, "..", `courses/${selectedCourse}`)
  const lessonOptions = fs.readdirSync(lessonsPath).filter(item => {
    return fs.lstatSync(path.resolve(lessonsPath, item)).isDirectory()
  })
  if (lessonOptions.length === 0) {
    console.log(`There are no lessons in ${selectedCourse}`)
    process.exit(0)
  }

  // Allow pre-selection from cli: `npm start advanced 4`
  if (!isNaN(selectedLesson) && lessonOptions.length <= selectedLesson) {
    selectedLesson = lessonOptions[selectedLesson - 1]
    // Otherwise, if they
  } else if (!lessonOptions.includes(selectedLesson)) {
    console.clear()
    console.log(`Which Lesson of ${selectedCourse}?`)
    const choice = readlineSync.keyInSelect(lessonOptions)
    if (choice === -1) {
      process.exit(0)
    }
    selectedLesson = lessonOptions[choice]
  }

  /**
   * Exercise/Lecture Selection
   */

  const options = [process.argv[2], process.argv[3], process.argv[4]]
  const selectedLessonVersion = options.includes("lecture") ? "lecture" : "exercise"

  /**
   * Entry
   */
  const entry = path.resolve(
    __dirname,
    "..",
    "courses",
    selectedCourse,
    selectedLesson,
    selectedLessonVersion,
    "index.js"
  )

  return entry
}

module.exports = getEntry
