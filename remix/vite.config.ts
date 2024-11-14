import { vitePlugin as remix } from '@remix-run/dev'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vite'
import { installGlobals } from '@remix-run/node'

installGlobals()

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    remix({
      appDirectory: process.env.REMIX_APP_DIR || './app',
      // Only needed in pre 2.0

      ignoredRouteFiles: ['**/*.css'],

      // tailwind: true,
      // Since lessons override the default app directory, we still need to
      // add a watcher to the app dir for shared files that lessons might use
      //watchPaths: ['./app'],
      future: {
        // v2_errorBoundary: true,
        // v2_meta: true,
        // v2_normalizeFormMethod: true,
        // v2_routeConvention: true,
      },
    }),
    tsconfigPaths(),
  ],
})
