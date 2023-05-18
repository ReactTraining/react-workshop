/** @type {import('@remix-run/dev').AppConfig} */

module.exports = {
  appDirectory: process.env.REMIX_APP_DIR || './app',
  // Only needed in pre 2.0
  serverModuleFormat: 'cjs',
  serverDependenciesToBundle: ['mdx-bundler'],
  tailwind: true,
  // Since lessons override the default app directory, we still need to
  // add a watcher to the app dir for shared files that lessons might use
  watchPaths: ['./app'],
  future: {
    v2_errorBoundary: true,
    v2_meta: true,
    v2_normalizeFormMethod: true,
    v2_routeConvention: true,
  },
}
