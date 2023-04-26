// Since Windows cannot run bash scripts, we do this in Node now. Here was the old bash script
// for reference: $ find . -iname db-seed.json | xargs -L1 -I {} bash -c 'cp {} $(dirname {})/db.json'

const path = require('path')
const fs = require('fs')
const shell = require('shelljs')

const dbPath = path.join(__dirname, '..', 'react', '_full-app', 'database')
try {
  shell.cp(`${dbPath}/db-seed.json`, `${dbPath}/db.json`)
} catch (err) {
  console.log(`Update to setup: ${dbPath}/db.json`)
}
