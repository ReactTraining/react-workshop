const fs = require('fs')
const path = require('path')
const concurrently = require('concurrently')

module.exports = function (dbPath) {
  if (dbPath.indexOf(' ') >= 0) {
    console.error(`We cant start this app if your path has spaces:\n${process.cwd()}\n\n`)
    process.exit(1)
  }

  // This allows the database to run in the background
  if (fs.existsSync(dbPath)) {
    concurrently([
      {
        command: `npx json-server --watch ${dbPath.replace()} -p 3333 --quiet`,
        name: 'npx json-server database',
      },
    ]).catch((err) => {
      console.error(
        'JSON-SERVER was not able to start. Port 3333 might still be open from a previous run. Try running `npm run kill-db-port` to kill the port\n\n'
      )
      process.exit(1)
    })
  } else {
    console.error(`db.json is missing at path ${dbPath}`)
    console.error('Try running `npm run create-db`')
    process.exit(1)
  }
}
