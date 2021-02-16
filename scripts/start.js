const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const concurrently = require('concurrently')
const config = require('../config/webpack.config.dev.js')
const devServerOptions = require('../config/webpack.devserver.config.js')

const rootDir = process.cwd()

/////////////// START SYNCHRONOUS COURSE MENU CLI
const cli = require('./cli')
const { appPath, alias, selectedCourse, selectedLessonType, selectedLesson } = cli()

/////////////// CREATE TS CONFIG FOR LESSON SELECTION
let tsConfigPath = ensureDevTsConfig({ selectedCourse, selectedLesson })

/////////////// START SERVER
const port = 3000
const appEntry = path.resolve(appPath, 'entry.js')
const server = new WebpackDevServer(
  webpack(config(appEntry, alias, { tsConfigPath })),
  devServerOptions
)

server.listen(port, 'localhost', function (err) {
  if (err) {
    console.log(err)
  } else {
    console.clear()
    console.log(`\nGo to: http://localhost:${port}`)
    console.log(
      `Compiling... ${selectedLesson ? `${selectedLessonType}: ${selectedLesson}` : 'App'}\n`
    )
  }

  ;['SIGINT', 'SIGTERM'].forEach(function (sig) {
    process.on(sig, function () {
      server.close()
      process.exit()
    })
  })

  const dbPath = path.resolve(appPath, 'database', 'db.json')

  // This allows the database to run in the background
  if (fs.existsSync(dbPath)) {
    concurrently([
      {
        command: `json-server --watch ${dbPath} -p 3333 --quiet`,
        name: 'json-server database',
      },
    ]).catch((err) => {
      console.error(
        'JSON-SERVER was not able to start. Its port 3333 might still be open from a previous run. Try running `npm run kill-db-port` to kill the port\n\n'
      )
      console.error(err)
      process.exit(1)
    })
  } else {
    console.error(`db.json is missing at path ${dbPath}`)
    console.error('Try running `npm run create-db`')
    process.exit(1)
  }
})

function ensureDevTsConfig({ selectedCourse, selectedLesson }) {
  try {
    let tsconfig = JSON.parse(fs.readFileSync(path.join(rootDir, 'tsconfig.json'), 'utf-8'))
    let tsconfigDevPath = path.join(rootDir, 'tsconfig.dev.json')

    let devTsConfig = {
      extends: './tsconfig.json',
      include: [
        ...tsconfig.include.filter((item) => item !== 'courses'),
        path.join('courses', selectedCourse, selectedLesson),
      ],
    }

    fs.writeFileSync(tsconfigDevPath, JSON.stringify(devTsConfig), 'utf-8')

    return tsconfigDevPath
  } catch (err) {
    return 'tsconfig.json'
  }
}
