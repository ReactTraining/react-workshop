const shell = require('shelljs')
const path = require('path')
const fs = require('fs')
const { createServer } = require('vite')
const react = require('@vitejs/plugin-react')
const { selectReactLesson } = require('./cli')
const startDB = require('./start-db')

/****************************************
  Preferences
*****************************************/

const preferencesPath = path.resolve(__dirname, '..', 'preferences.json')
let preferences = {}
try {
  const data = fs.readFileSync(preferencesPath, 'utf8')
  preferences = JSON.parse(data)
} catch (err) {
  // no-op
}

function savePreferences(updates) {
  try {
    fs.writeFileSync(preferencesPath, JSON.stringify({ ...preferences, ...updates }, null, 2))
  } catch (err) {
    // no-op
  }
}

/****************************************
  Choose Course Type (REMIX or SPA)
*****************************************/

switch (process.argv[2]) {
  case 'remix':
    startRemix()
    break
  default:
    startReact()
    break
}

/****************************************
  Remix
*****************************************/

function startRemix() {
  console.log('START REMIX')
  // const appPath = path.resolve(__dirname, '..', 'apps', 'remix')
  // shell.cd(appPath)
  // shell.exec('npm run dev')
}

/****************************************
  React SPA (Vite Server)
*****************************************/

async function startReact() {
  const coursesPath = path.resolve(__dirname, '..', 'react')

  const { lessonPath, selectedLessonType, selectedLesson } = selectReactLesson(
    coursesPath,
    preferences,
    savePreferences
  )

  const appName = '_full-app'
  const appPath = path.resolve(__dirname, '..', 'react', appName)

  // The thing we can use in imports like `from 'spa/file'`
  const appRoot = 'spa'

  // Get aliases
  const alias = {}

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

  // Database
  const dbPath = path.resolve(appPath, 'database', 'db.json')
  startDB(dbPath)

  // Server

  // https://vitejs.dev/guide/api-javascript.html#vitedevserver
  // https://vitejs.dev/config/

  const port = 3000
  const server = await createServer({
    plugins: [react()],
    resolve: {
      alias,
    },
    root: process.cwd(),
    server: {
      port,
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
