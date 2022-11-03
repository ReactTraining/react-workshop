import * as React from 'react'
import { createPortal } from 'react-dom'
import { position } from './utils'
import './styles.scss'

function Portal({ children }) {
  const [root, setRoot] = React.useState(null)

  React.useEffect(() => {
    const root = document.createElement('div')
    document.body.appendChild(root)
    setRoot(root)
    return () => {
      document.body.removeChild(root)
    }
  }, [])

  return root ? createPortal(children, root) : null
}

const Popover = ({ children, targetRef }) => {
  const [styles, setStyles] = React.useState({})

  const popoverRef = React.useRef()

  function initRef(node) {
    if (!popoverRef.current && node !== null) {
      popoverRef.current = node
      const targetRect = targetRef.current.getBoundingClientRect()
      const popoverRect = popoverRef.current.getBoundingClientRect()
      setStyles(position(targetRect, popoverRect))
    }
  }

  return (
    <Portal>
      <div ref={initRef} className="popover" style={{ position: 'absolute', ...styles }}>
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

;<div>
  <div>
    <button></button>
  </div>
</div>
