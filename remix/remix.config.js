/** @type {import('@remix-run/dev').AppConfig} */

module.exports = {
  ignoredRouteFiles: ['**/.*'],
  appDirectory: process.env.REMIX_APP_DIR || './app',
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
  // watchPaths: ['./styles'],
  serverModuleFormat: 'cjs', // Only needed in pre 2.0
  serverDependenciesToBundle: ['mdx-bundler'],
  tailwind: true,
  future: {
    v2_errorBoundary: true,
    v2_meta: true,
    v2_normalizeFormMethod: true,
    v2_routeConvention: true,
  },
}
