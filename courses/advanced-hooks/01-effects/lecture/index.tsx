import * as React from 'react'
import * as ReactDOM from 'react-dom'

/**
 * Which one do you want to teach?
 */

// 1. Overview of useEffect with network requests
// This is similar to the core workshop exercise on hooks
// Open ProductProfile.js to show a network (async) side effect
// Open ProductsSidebar.js to show a subscription side effect
import App from 'YesterTech/App'
ReactDOM.render(<App />, document.getElementById('root'))

// 2. The closure of useEffect "captures" state (basic example)
// import App from './closure-basics'
// ReactDOM.render(<App />, document.getElementById('root'))

// 3. Another capturing example (Stopwatch)
// import App from './stopwatch'
// ReactDOM.render(<App />, document.getElementById('root'))

// 4. Phony useEffect
// import './phony-hooks'
