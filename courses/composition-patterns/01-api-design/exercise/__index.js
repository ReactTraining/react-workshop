import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { FaAngleRight, FaAngleDown } from 'react-icons/fa'
import './styles.scss'

// Create a reusable component for a generic Disclosure component.
// This is just giving you the starting DOM structure and basic functionality
// you're aiming for.

function App() {
  let [open, setOpen] = React.useState(false)
  function toggle() {
    setOpen((open) => !open)
  }
  return (
    <div className="App">
      <div className="disclosure">
        <button
          aria-controls="disclosure-panel"
          aria-expanded={open}
          data-state={open ? 'open' : 'collapsed'}
          className="disclosure__button"
          onClick={toggle}
        >
          <span className="disclosure__button-icon" aria-hidden>
            {open ? <FaAngleDown /> : <FaAngleRight />}
          </span>
          I just want to tell you how I'm feeling
        </button>

        <div
          hidden={!open}
          className="disclosure__panel"
          data-state={open ? 'open' : 'collapsed'}
          id="disclosure-panel"
          tabIndex={-1}
        >
          <blockquote>
            <p>
              Never gonna give you up. Never gonna let you down. Never gonna run around and desert
              you.
            </p>
            <p>
              Never gonna make you cry. Never gonna say goodbye. Never gonna tell a lie and hurt you
            </p>
            <cite>Richard Paul Astley</cite>
          </blockquote>
        </div>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
