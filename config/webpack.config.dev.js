// Do this as the first thing so that any code reading it knows the right env.
process.env.NODE_ENV = 'development'
const getClientEnvironment = require('./env')
const env = getClientEnvironment()
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = function (appEntry, alias) {
  return {
    // Enhanced dev support (like correct line numbers on errors)
    devtool: 'source-map',
    mode: 'development',
    entry: appEntry,
    output: {
      // This does not produce a real file. It's just the virtual path that is
      // served by WebpackDevServer in development. This is the JS bundle
      // containing code from all our entry points, and the Webpack runtime.
      filename: '[name].bundle.js',
      chunkFilename: '[name].bundle.js',
      // Where to create the build
      path: path.resolve(process.cwd(), 'build'),
      publicPath: '/',
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      // This is the "trick" to get our curriculum to load from
      // the app but to use courses as alias
      modules: ['apps', 'node_modules'],
      alias,
    },
    module: {
      rules: [
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            {
              options: {
                cacheDirectory: true,
              },
              loader: 'babel-loader',
            },
            'eslint-loader',
          ],
        },
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
              },
            },
          ],
        },
        // Process CSS and SCSS
        {
          test: /\.(css|scss)$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: false,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        // Path to HTML file
        template: './public/index.html',
        // Variables listed here in the configurations for HtmlWebpackPlugin become ejs
        // variables for interpolation in the HTML file, accessible with
        // <%- htmlWebpackPlugin.options.[varName] %>. We put our env variables in for HTML access
        env: env.raw,
      }),
      // Make global variables available to the application. We use this to
      // set process.env vars in the front-end
      new webpack.DefinePlugin(env.stringified),
      new ForkTsCheckerWebpackPlugin(),
    ],
    // Some libraries import Node modules but don't use them in the browser.
    // Tell Webpack to provide empty mocks for them so importing them works.
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
    },
  }
}
