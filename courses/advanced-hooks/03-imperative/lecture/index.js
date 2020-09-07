import React, { useState, useLayoutEffect, useRef } from 'react'
import ReactDOM, { createPortal } from 'react-dom'
import './styles.scss'

function Portal({ children }) {
  const portalNode = useRef(null)
  const [_, forceUpdate] = useState()

  useLayoutEffect(() => {
    portalNode.current = document.createElement('portal')
    document.body.appendChild(portalNode.current)
    forceUpdate({})
    return () => {
      if (portalNode.current) {
        document.body.removeChild(portalNode.current)
      }
    }
  }, [])

  return portalNode.current ? createPortal(children, portalNode.current) : null
}

function Popover({ children }) {
  return (
    <Portal>
      <div>{children}</div>
    </Portal>
  )
}

function Define({ children }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        onBlur={() => setOpen(false)}
        className="as-link"
      >
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
