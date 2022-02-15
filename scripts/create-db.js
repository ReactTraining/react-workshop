// Since Windows cannot run bash scripts, we do this in Node now. Here was the old bash script
// for reference: $ find . -iname db-seed.json | xargs -L1 -I {} bash -c 'cp {} $(dirname {})/db.json'

const path = require('path')
const fs = require('fs')
const shell = require('shelljs')

const APPS_ROOT_PATH = path.join(__dirname, '..', 'apps')

for (const appPath of getDirectories(APPS_ROOT_PATH)) {
  const dbPath = path.join(appPath, 'database')
  try {
    shell.cp(`${dbPath}/db-seed.json`, `${dbPath}/db.json`)
  } catch (err) {}
}

function isDirectory(pathname) {
  return fs.lstatSync(pathname).isDirectory()
}

function getDirectories(pathname) {
  return fs
    .readdirSync(pathname)
    .map((name) => path.join(pathname, name))
    .filter(isDirectory)
}
