import { vitePlugin as remix } from '@remix-run/dev'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vite'

declare module '@remix-run/node' {
  // or cloudflare, deno, etc.
  interface Future {
    v3_singleFetch: true
  }
}

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    remix({
      appDirectory: process.env.REMIX_APP_DIR || './app',
      // Only needed in pre 2.0

      ignoredRouteFiles: ['**/*.css'],

      // Since lessons override the default app directory, we still need to
      // add a watcher to the app dir for shared files that lessons might use
      // watchPaths: ['./app'],
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
    }),
    tsconfigPaths(),
  ],
})
