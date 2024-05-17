import shell from 'shelljs'
import path from 'path'
import fs from 'fs'
import readlineSync from 'readline-sync'
import { createServer } from 'vite'
import react from '@vitejs/plugin-react'
import { selectReactLesson, selectRemixLesson } from './select-lesson'
import { startDatabase } from './start-db'

if (process.cwd().indexOf(' ') >= 0) {
  console.error(`We cant start this app if your path has spaces:\n${process.cwd()}\n\n`)
  process.exit(1)
}

/****************************************
  Preferences
*****************************************/

const preferencesPath = path.resolve(__dirname, '..', 'preferences.json')
let preferences: Record<string, string | boolean> = {}
try {
  const data = fs.readFileSync(preferencesPath, 'utf8')
  preferences = JSON.parse(data)
  if (preferences.compiledReact === undefined) {
    preferences.compiledReact = false
  }
} catch (err) {
  // no-op
}

function savePreferences(updates: Record<string, string>) {
  try {
    fs.writeFileSync(preferencesPath, JSON.stringify({ ...preferences, ...updates }, null, 2))
  } catch (err) {
    // no-op
  }
}

/****************************************
  Choose Workshop
*****************************************/

if (!preferences.workshop) {
  console.log('Which Workshop?')
  const workshopOptions = ['React', 'Remix']
  const choice = readlineSync.keyInSelect(workshopOptions)
  if (choice === -1) process.exit(0)
  // start over with preferences
  preferences = {
    workshop: workshopOptions[choice].toLowerCase(),
  }
  fs.writeFileSync(preferencesPath, JSON.stringify(preferences, null, 2))
}

/****************************************
  Choose Course From Workshop
*****************************************/

switch (preferences.workshop.toLowerCase()) {
  case 'react': {
    const mainPath = path.resolve(process.cwd(), 'react')
    startReact(mainPath)
    break
  }
  case 'remix':
    startRemix()
    break
  default:
    console.log('No workshop selected in preferences.json')
    process.exit(0)
}

/****************************************
  Remix
*****************************************/

function startRemix() {
  if (!fs.existsSync(path.resolve(__dirname, '..', 'remix/node_modules'))) {
    console.log('Run `npm run install-remix` first then to `npm start` again')
    process.exit(0)
  }

  const lessonsPath = path.resolve(__dirname, '..', 'remix/lessons')
  const { lessonPath } = selectRemixLesson(lessonsPath)

  if (lessonPath) {
    process.env.REMIX_APP_DIR = lessonPath
  }

  const appPath = path.resolve(__dirname, '..', 'remix')
  startDatabase(path.resolve(appPath, '_database'))
  shell.cd(appPath)
  shell.exec('npm run dev')
}

/****************************************
  React SPA (Vite Server)
*****************************************/

async function startReact(coursesPath: string) {
  // const coursesPath = path.resolve(__dirname, '..', 'react')

  const { lessonPath, selectedLessonType, selectedLesson } = selectReactLesson(
    coursesPath,
    preferences,
    savePreferences
  )

  const appName = '_full-app'
  const appPath = path.resolve(coursesPath, appName)
  startDatabase(path.resolve(appPath, '_database'))

  // The thing we can use in imports like `from '/file'`
  const appRoot = '~'

  // Get aliases
  const alias: Record<string, string> = {}

  if (lessonPath) {
    // const aliasBasePath = `${courseAppNames[selectedCourse]}`
    fs.readdirSync(lessonPath).forEach((file) => {
      const name = path.basename(file).replace(/\.(js|jsx|ts|tsx)$/, '')

      alias[path.join(appRoot, name)] = path.join(lessonPath, file)

      // WINDOWS HACK
      // On windows machines, the paths will have double back-slashes which we want
      // for the full file paths (the values of this object) but not the aliases (the keys)
      alias[path.join(appRoot, name).replace(/\\/g, '/')] = path.join(lessonPath, file)
    })
  }

  // Add the full app alias last
  alias[appRoot] = appPath

  // Server

  // https://vitejs.dev/guide/api-javascript.html#vitedevserver
  // https://vitejs.dev/config/

  shell.cd(appPath)

  const ReactCompilerConfig = {}
  const plugins = !preferences.compiledReact
    ? [react()]
    : [
        react({
          babel: {
            plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]],
          },
        }),
      ]

  const port = 3000
  const server = await createServer({
    configFile: false,
    root: appPath,
    server: {
      port,
    },
    plugins,
    resolve: {
      alias,
    },
    optimizeDeps: { include: ['firebase/app', 'firebase/firestore'] },
  })

  await server.listen()

  // Helps to force-quit concurrently for json-server when we quit
  ;['SIGINT', 'SIGTERM'].forEach(function (sig) {
    process.on(sig, function () {
      process.exit()
    })
  })

  console.clear()
  console.log(
    selectedLesson ? `Running Lesson: ${selectedLesson}/${selectedLessonType}` : 'Running Full App'
  )
  console.log(`\nGo to: http://localhost:${port}`)
}
