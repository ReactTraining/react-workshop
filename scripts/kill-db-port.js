const find = require('find-process')
const port = process.argv[2]

if (port) {
  find('port', port)
    .then(list => {
      console.log(
        `Killing process on port ${port}. This cause cause the React Training app to crash also, that's okay.\n\n`
      )
      console.log(
        `If this does not successfully kill the database port ${port}, try running \`lsof -ti :${port} | xargs kill\` on machines with Bash. If you're on Windows, please manually kill the process running ${port} port.\n\n`
      )
      Array.isArray(list) && list[0] && process.kill(list[0].pid)
    })
    .catch(err => {
      console.log(`No process found for port ${port}`)
    })
}
