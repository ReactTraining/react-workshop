import shell from 'shelljs'
import path from 'path'

const apps = [
  // 'app-nextjs',
  // 'app-react-router-framework',
  'app-react-router-spa',
]
const rootPath = process.cwd()

apps.forEach((app) => {
  const appPath = path.resolve(rootPath, app)
  console.log(`Installing ${app}`)
  shell.cd(appPath)
  shell.exec('npm install --force')
})
