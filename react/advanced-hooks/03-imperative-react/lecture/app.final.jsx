import { useEffect, useLayoutEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import { position } from './utils'

const Portal = ({ children }) => {
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

const Popover = ({ children, targetRef, ...props }) => {
  const popoverRef = useRef(null)
  const [styles, setStyles] = useState({})

  // Doing this work in a ref callback helps overcome a race-condition where
  // we need to ensure the popoverRef has been established. It's established
  // later than we might expect because the div it's applied to is the children
  // of Portal which returns null initially (which it must do)
  function initPopoverRef(el) {
    // initPopoverRef will be called numerous times, lets do this work once.
    if (!popoverRef.current) {
      popoverRef.current = el
      if (targetRef.current && popoverRef.current) {
        const targetRect = targetRef.current.getBoundingClientRect()
        const popoverRect = popoverRef.current.getBoundingClientRect()
        setStyles(position(targetRect, popoverRect))
      }
    }
  }

  return (
    <Portal>
      <div
        {...props}
        ref={initPopoverRef}
        className="bg-black text-white rounded py-1 px-3"
        style={{
          position: 'absolute',
          ...styles,
        }}
      >
        {children}
      </div>
    </Portal>
  )
}

const Define = ({ children }) => {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef()

  useEffect(() => {
    const listener = (event) => {
      if (event.target !== buttonRef.current) {
        setOpen(false)
      }
    }
    window.addEventListener('click', listener)
    return () => window.removeEventListener('click', listener)
  }, [])

  return (
    <>
      <button
        ref={buttonRef}
        className="text-sky-600"
        onClick={() => {
          setOpen(!open)
        }}
      >
        {children}
      </button>
      {open && (
        <Popover onClick={(e) => e.stopPropagation()} targetRef={buttonRef}>
          Hooks are a way to compose behavior into components
        </Popover>
      )}
    </>
  )
}

export function App() {
  return (
    <p>
      Modern React is filled with <Define>Hooks</Define>. They work with function-components and
      they give us an ability to use state and other React features similarly to class-based
      components.
    </p>
  )
}
