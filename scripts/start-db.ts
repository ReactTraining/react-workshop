import fs from 'fs'
import path from 'path'
import shell from 'shelljs'
import concurrently from 'concurrently'

export function startDatabase(dbDir: string) {
  const dbPath = path.join(dbDir, 'db.json')

  try {
    if (!fs.existsSync(dbPath)) {
      shell.cp(`${dbDir}/db-seed.json`, dbPath)
    }

    concurrently([
      {
        command: `npx json-server --watch ${dbPath} -p 3333 --quiet`,
        name: 'npx json-server database',
      },
    ]).catch(() => {
      console.error(
        'JSON-SERVER was not able to start. Port 3333 might still be open from a previous run. Try running `npm run kill-db-port` to kill the port\n\n'
      )
      process.exit(1)
    })
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}
