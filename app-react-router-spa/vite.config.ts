import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { loadPreferences } from '../scripts/preferences'
import tailwindcss from '@tailwindcss/vite'

const preferences = loadPreferences()
const lessonPath = preferences.lessonPath

// Get aliases
const alias: Record<string, string> = {}

// The thing we can use in imports like `from '/file'`
const appRoot = '~'

if (lessonPath) {
  // const aliasBasePath = `${courseAppNames[selectedCourse]}`
  fs.readdirSync(lessonPath).forEach((file) => {
    const name = path.basename(file).replace(/\.(js|jsx|ts|tsx)$/, '')

    alias[path.join(appRoot, name)] = path.join(lessonPath, file)

    // WINDOWS HACK
    // On windows machines, the paths will have double back-slashes which we want
    // for the full file paths (the values of this object) but not the aliases (the keys)
    alias[path.join(appRoot, name).replace(/\\/g, '/')] = path.join(lessonPath, file)
  })
}

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    tailwindcss(),
    react({
      // Enable React Compiler Demos
      // babel: {
      //   plugins: [['babel-plugin-react-compiler', {}]],
      // },
    }),
  ],
  resolve: {
    alias: {
      // Spread aliases first...
      ...alias,
      // Then add the app root alias
      '~': path.resolve(__dirname, 'src'),
    },
  },
})
