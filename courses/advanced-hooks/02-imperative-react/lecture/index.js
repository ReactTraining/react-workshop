import React, { useState, useLayoutEffect, useRef } from 'react'
import ReactDOM, { createPortal } from 'react-dom'
import { position } from './utils'
import './styles.scss'

function Popover({ children }) {
  return <div data-popover="">{children}</div>
}

function Define({ children }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button onClick={() => setOpen(!open)} className="as-link">
        {children}
      </button>
      {open && <Popover>Hooks are a way to compose behavior into components</Popover>}
    </>
  )
}

function App() {
  return (
    <p>
      Modern React is filled with <Define>Hooks</Define>
    </p>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
