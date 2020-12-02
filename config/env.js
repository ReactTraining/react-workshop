const fs = require('fs')
const path = require('path')
const React = require('react')
const packageJSON = require('../package.json')

const NODE_ENV = process.env.NODE_ENV
if (!NODE_ENV) {
  throw new Error(
    'The NODE_ENV environment variable is required but was not specified.'
  )
}

// Create list of possible env files
const envPath = path.resolve(process.cwd(), '.env')
const dotenvFiles = [
  `${envPath}.${NODE_ENV}`,
  envPath,
]

// Load environment variables from .env* files. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.
// https://github.com/motdotla/dotenv
dotenvFiles.forEach(dotenvFile => {
  if (fs.existsSync(dotenvFile)) {
    require('dotenv').config({
      path: dotenvFile,
    })
  }
})

// Grab NODE_ENV and REACT_APP_* environment variables and prepare them to be
// injected into the application via DefinePlugin in Webpack configuration.
const REACT_APP = /^REACT_APP_/i

function getClientEnvironment() {
  const raw = Object.keys(process.env)
    .filter(key => REACT_APP.test(key))
    .reduce(
      (env, key) => {
        env[key] = process.env[key]
        return env
      },
      {
        // Useful for determining whether we’re running in production mode.
        // Most importantly, it switches React into the correct mode.
        NODE_ENV: process.env.NODE_ENV || 'development',
        // Determines where static assets are located. In development, Webpack
        // DevServer puts them in a virtual folder called `/static`. But we can
        // customise that with .env for production in situations where our assets
        // might be on a CDN
        STATIC_ASSET_URL: process.env.STATIC_ASSET_URL || '/static',
        REACT_VERSION: React.version,
        APP_VERSION: packageJSON.version
      }
    )

  // Stringify all values so we can feed into Webpack DefinePlugin
  const stringified = {
    'process.env': Object.keys(raw).reduce(
      (env, key) => {
        env[key] = JSON.stringify(raw[key])
        return env
      },
      {}
    ),
  }

  return { raw, stringified }
}

module.exports = getClientEnvironment