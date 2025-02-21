import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
// import path from "path";
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

const alias = {
  // '~/lesson-routes':
  //   '/Users/bradwestfall/Desktop/ReactTraining/Projects/react-workshop/app-react-router-framework/LESSONS/01-routing/lecture/lesson-routes.tsx',
  '~/routes/home':
    '/Users/bradwestfall/Desktop/ReactTraining/Projects/react-workshop/app-react-router-framework/LESSONS/01-routing/lecture/lesson-routes.tsx',
}

export default defineConfig({
  resolve: {
    alias: {
      // // Spread aliases first...
      // ...alias,
      // Then add the app root alias
      '~': path.resolve(__dirname, 'app'),
    },
  },
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  server: {
    port: 3000,
  },
})
