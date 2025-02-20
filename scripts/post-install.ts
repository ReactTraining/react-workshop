import shell from 'shelljs'

const apps = [
  // 'app-react-router-spa-framework'
  'app-react-router-spa',
]

apps.forEach((app) => {
  console.log(`Installing ${app}`)
  shell.cd(app)
  shell.exec('npm install')
})
