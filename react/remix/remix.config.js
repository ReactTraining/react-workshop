/** @type {import('@remix-run/dev').AppConfig} */

module.exports = {
  ignoredRouteFiles: ['**/.*'],
  appDirectory: process.env.REMIX_APP_DIR || './app',
  // Only needed in pre 2.0
  serverModuleFormat: 'cjs',
  serverDependenciesToBundle: ['mdx-bundler'],
  tailwind: true,
  future: {
    v2_errorBoundary: true,
    v2_meta: true,
    v2_normalizeFormMethod: true,
    v2_routeConvention: true,
  },
}
