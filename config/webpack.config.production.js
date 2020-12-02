// Do this as the first thing so that any code reading it knows the right env.
process.env.NODE_ENV = 'production'
const getClientEnvironment = require('./env')
const env = getClientEnvironment()

const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  // Don't attempt to continue if there are any errors.
  bail: true,
  entry: path.resolve(process.cwd(), 'src/index.js'),
  output: {
    filename: 'static/js/bundle.js',
    // Where to create the build
    path: path.resolve(process.cwd(), 'build'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader', 'babel-loader', 'eslint-loader'],
      },
      // Process CSS and SCSS
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: false,
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // Path to HTML file
      template: './public/index.html',
      // Minification options
      minify: {
        removeComments: false,
        collapseWhitespace: false,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      hash: true,
      // Variables listed here in the configurations for HtmlWebpackPlugin become ejs
      // variables for interpolation in the HTML file, accessible with
      // <%- htmlWebpackPlugin.options.[varName] %>. We put our env variables in for HTML access
      env: env.raw,
    }),
    // Copy static assets from public/static to build/static
    new CopyWebpackPlugin([
      {
        from: path.resolve(process.cwd(), 'public/static'),
        to: 'static',
      },
    ]),
    // Make global variables available to the application. We use this to
    // set process.env vars in the front-end
    new webpack.DefinePlugin(env.stringified),
    // GZip
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  // Don't show performance hints at build time. They just tell us to use code splitting
  performance: {
    hints: false,
  },
}
