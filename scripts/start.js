const { createServer } = require('vite')
const path = require('path')
const react = require('@vitejs/plugin-react')
const cli = require('./cli')
const startDB = require('./start-db')

/****************************************
  CLI Menu
*****************************************/

const fullApp = process.argv.includes('app')
let { appPath, alias, selectedLessonType, selectedLesson } = cli(fullApp)

console.clear()

const fullAppAlias = { 'course-platform': appPath }
alias = fullApp ? fullAppAlias : { ...alias, ...fullAppAlias }

/****************************************
  Database
*****************************************/

const dbPath = path.resolve(appPath, 'database', 'db.json')
startDB(dbPath)

/****************************************
  Vite Server
*****************************************/

const port = 3000

async function start() {
  // https://vitejs.dev/guide/api-javascript.html#vitedevserver
  // https://vitejs.dev/config/

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

start()
