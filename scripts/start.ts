import shell from 'shelljs'
import fs from 'fs'
import path from 'path'
import readlineSync from 'readline-sync'
import { selectReactLesson } from './select-lesson'
import { savePreferences, loadPreferences } from './preferences'

if (process.cwd().indexOf(' ') >= 0) {
  console.error(
    `We cant start this app if your path has spaces:\n${process.cwd()}\n\nPlease remove spaces and start again`
  )
  process.exit(1)
}

/****************************************
 Choose Framework
*****************************************/

const preferences = loadPreferences()
let framework = ''

if (!preferences.framework) {
  console.log('Which Framework?')
  const options = ['app-react-router-framework', 'app-react-router-spa']
  const choice = readlineSync.keyInSelect(options)
  if (choice === -1) process.exit(0)
  savePreferences({
    framework: options[choice].toLowerCase(),
  })
  framework = options[choice].toLowerCase()
} else {
  framework = preferences.framework.toLowerCase()
}

/****************************************
  Choose Course From Framework
*****************************************/

switch (framework.toLowerCase()) {
  case 'app-react-router-spa': {
    const coursesPath = path.resolve(process.cwd(), 'app-react-router-spa', 'COURSES')
    startReactSPA(coursesPath)
    break
  }
  default:
    console.log('No framework selected in preferences.json')
    process.exit(0)
}

/****************************************
  Remix
*****************************************/

// function startRemix() {
//   if (!fs.existsSync(path.resolve(__dirname, '..', 'remix/node_modules'))) {
//     console.log('Run `npm run install-remix` first then to `npm start` again')
//     process.exit(0)
//   }

//   const lessonsPath = path.resolve(__dirname, '..', 'remix/lessons')
//   const { lessonPath } = selectRemixLesson(lessonsPath)

//   if (lessonPath) {
//     process.env.REMIX_APP_DIR = lessonPath
//   }

//   const appPath = path.resolve(__dirname, '..', 'remix')
//   startDatabase(path.resolve(appPath, '_database'))
//   shell.cd(appPath)
//   shell.exec('npm run dev')
// }

/****************************************
  React SPA (Vite Server)
*****************************************/

async function startReactSPA(coursesPath: string) {
  const appName = 'app-react-router-spa'
  const appPath = path.resolve(process.cwd(), appName)

  // Get the lesson path and create an environment variable for vite
  // config to use. No path means run full app
  const lessonPath = selectReactLesson(coursesPath)
  if (lessonPath) {
    process.env.RT_LESSON_PATH = lessonPath
  }

  createDatabaseFromSeed(path.resolve(appPath, 'db'))

  shell.cd(appPath)
  shell.exec('npm run dev')
}

/****************************************
  Utils
*****************************************/

export function createDatabaseFromSeed(dbDir: string) {
  const dbPath = path.join(dbDir, 'db.json')

  try {
    if (!fs.existsSync(dbPath)) {
      shell.cp(`${dbDir}/db-seed.json`, dbPath)
    }
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}
