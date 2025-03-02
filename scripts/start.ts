import shell from 'shelljs'
import fs from 'fs'
import path from 'path'
import readlineSync from 'readline-sync'
import { selectReactLesson, selectReactRouterFrameworkLesson } from './select-lesson'
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
  Choose Course From Framework Folder
*****************************************/

switch (framework.toLowerCase()) {
  case 'app-react-router-framework': {
    const appPath = path.resolve(process.cwd(), 'app-react-router-framework')
    startReactRouterFramework(appPath)
    break
  }
  case 'app-react-router-spa': {
    const appPath = path.resolve(process.cwd(), 'app-react-router-spa')
    startReactSPA(appPath)
    break
  }
  default:
    console.log('No framework selected in preferences.json')
    process.exit(0)
}

/****************************************
  React Router Framework (Remix)
*****************************************/

function startReactRouterFramework(appPath: string) {
  const lessonsPath = path.resolve(appPath, 'LESSONS')

  // Detect Node Version
  const nodeMajor = process.version.replace('v', '').split('.')[0]
  if (nodeMajor < '20') {
    console.log('Node version must be 20.0.0 or higher')
    process.exit(1)
  }

  // Get the lesson path and create an environment variable for RR
  // config to use. No path means run full app
  const lessonPath = selectReactRouterFrameworkLesson(lessonsPath)
  if (lessonPath) {
    process.env.REMIX_APP_DIR = lessonPath
  }

  createDatabaseFromSeed(path.resolve(appPath, 'db'))
  shell.cd(appPath)
  shell.exec('npm run dev')
}

/****************************************
  React SPA (Vite Server)
*****************************************/

async function startReactSPA(appPath: string) {
  const coursesPath = path.resolve(appPath, 'COURSES')

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
