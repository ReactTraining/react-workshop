import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

/****************************************
  Curriculum Alias'
*****************************************/

// If you're in here to learn, just understand that this block of code
// is only for making dynamic aliases for our curriculum to work, a section
// like this is not normal in a Vite config file

const lessonPath = process.env.RT_LESSON_PATH || ''

// Get aliases
const alias: Record<string, string> = {}

if (lessonPath) {
  // The thing we can use in imports like `from '/file'`
  const appRoot = '~'

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

/****************************************
  Vite Config
*****************************************/

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    tailwindcss(),
    react({
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
