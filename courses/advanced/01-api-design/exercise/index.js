import React from 'react'
import ReactDOM from 'react-dom'
import { FaAngleRight } from 'react-icons/fa'
import '../lecture/styles.scss'

// Create a reusable component in the Disclosure.js file. This is just
// giving you the starting DOM structure you're aiming for:

function App() {
  return (
    <div className="disclosure">
      <button className="disclosure-button">
        <FaAngleRight />
        Click Me
      </button>
      <div className="disclosure-panel">Panel Contents</div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
