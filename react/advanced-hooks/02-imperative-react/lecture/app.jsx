import * as React from 'react'
import { createPortal } from 'react-dom'
import { position } from './utils'
import './styles.scss'

function Portal({ children }) {
  const [node, setNode] = React.useState(null)

  React.useEffect(() => {
    const node = document.createElement('div')
    setNode(node)
    document.body.appendChild(node)
    return () => {
      document.body.removeChild(node)
    }
  }, [])

  return node ? createPortal(children, node) : null
}

const Popover = ({ children, targetRef }) => {
  const popoverRef = React.useRef()
  const [styles, setStyles] = React.useState({})

  function initRef(node) {
    if (node && !popoverRef.current) {
      popoverRef.current = node
      const targetRect = targetRef.current.getBoundingClientRect()
      const popoverRect = popoverRef.current.getBoundingClientRect()
      setStyles(position(targetRect, popoverRect))
    }
  }

  return (
    <Portal>
      <div ref={initRef} style={{ position: 'absolute', ...styles }} className="popover">
        {children}
      </div>
    </Portal>
  )
}

const Define = ({ children }) => {
  const [open, setOpen] = React.useState(false)

  const buttonRef = React.useRef()

  return (
    <>
      <button ref={buttonRef} onClick={() => setOpen(!open)}>
        {children}
      </button>
      {open && (
        <Popover targetRef={buttonRef}>Hooks are a way to compose behavior into components</Popover>
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
