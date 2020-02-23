// Since Windows cannot run bash scripts, we do this in Node now. Here was the old bash script
// for reference: $ find . -iname db-seed.json | xargs -L1 -I {} bash -c 'cp {} $(dirname {})/db.json'

const shell = require('shelljs')
const path = `apps/YesterTech/database`
shell.cp(`${path}/db-seed.json`, `${path}/db.json`)
