import React, { useState, useLayoutEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { position } from './utils'
import './styles.scss'

// const targetRect = targetRef.current.getBoundingClientRect()
// const popoverRect = popoverRef.current.getBoundingClientRect()
// setStyles(position(targetRect, popoverRect))

function Popover({ children }) {
  return <div className="popover">{children}</div>
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

export default function App() {
  return (
    <p>
      Modern React is filled with <Define>Hooks</Define>. You can still use classes if you
      wish, but composability isn't as nice. Hooks were designed to give us better
      composability with "custom hooks".
    </p>
  )
}
