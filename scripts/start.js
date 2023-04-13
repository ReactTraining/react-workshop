const shell = require('shelljs')
const path = require('path')
const fs = require('fs')
const { createServer } = require('vite')
const react = require('@vitejs/plugin-react')
const cli = require('./cli')
const startDB = require('./start-db')

/****************************************
  CLI Menu
*****************************************/

const { lessonPath, selectedCourse, selectedLessonType, selectedLesson } = cli()

switch (selectedCourse) {
  case 'remix':
    startRemix()
    break
  default:
    startSPA()
    break
}

/****************************************
  Remix
*****************************************/

function startRemix() {
  const appPath = path.resolve(__dirname, '..', 'apps', 'remix')
  shell.cd(appPath)
  shell.exec('npm run dev')
}

/****************************************
  SPA (Vite Server)
*****************************************/

async function startSPA() {
  const appName = 'course-platform'
  const appPath = path.resolve(__dirname, '..', 'apps', appName)

  // Get aliases
  const alias = {}

  if (lessonPath) {
    // const aliasBasePath = `${courseAppNames[selectedCourse]}`
    fs.readdirSync(lessonPath).forEach((file) => {
      const name = path.basename(file).replace(/\.(js|jsx|ts|tsx)$/, '')

      alias[path.join(appName, name)] = path.join(lessonPath, file)

      // WINDOWS HACK
      // On windows machines, the paths will have double back-slashes which we want
      // for the full file paths (the values of this object) but not the aliases (the keys)
      alias[path.join(appName, name).replace(/\\/g, '/')] = path.join(lessonPath, file)
    })
  }

  // Add the full app alias last
  alias[appName] = appPath

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
