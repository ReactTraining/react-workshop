import React, { useState, useLayoutEffect, useRef } from 'react'
import ReactDOM, { createPortal } from 'react-dom'
import { position } from './utils'
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

function Popover({ children, targetRef }) {
  const popoverRef = useRef()
  const [styles, setStyles] = useState({})

  useLayoutEffect(() => {
    const targetRect = targetRef.current.getBoundingClientRect()
    const popoverRect = targetRef.current.getBoundingClientRect()
    setStyles(position(targetRect, popoverRect))
  }, [targetRef])

  return (
    <Portal>
      <div
        ref={popoverRef}
        data-popover=""
        onClick={e => e.stopPropagation()}
        style={{
          position: 'absolute',
          ...styles
        }}
      >
        {children}
      </div>
    </Portal>
  )
}

function Define({ children }) {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef()

  useLayoutEffect(() => {
    window.addEventListener('click', event => {
      if (event.target !== buttonRef.current) {
        setOpen(false)
      }
    })
  }, [])

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        // onBlur={() => setOpen(false)}
        className="as-link"
      >
        {children}
      </button>
      {open && (
        <Popover targetRef={buttonRef}>
          Hooks are a way to compose behavior into components
        </Popover>
      )}
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
