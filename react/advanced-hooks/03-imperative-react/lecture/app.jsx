import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { LessonBody, LessonCard } from '~/Lesson'
import { position } from './utils'

function Portal({ children }) {
  const [node, setNode] = useState(null)

  useEffect(() => {
    const node = document.createElement('div')
    document.body.appendChild(node)
    setNode(node)
    return () => {
      document.body.removeChild(node)
    }
  }, [])

  return node ? createPortal(children, node) : null
}

const Popover = ({ children, targetRef }) => {
  const [styles, setStyles] = useState({})
  const popoverRef = useRef()

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
      <div
        ref={initRef}
        style={{ position: 'absolute', ...styles }}
        className="bg-black text-white rounded py-1 px-3"
      >
        {children}
      </div>
    </Portal>
  )
}

const Define = ({ children }) => {
  const [open, setOpen] = useState(false)

  const buttonRef = useRef()

  return (
    <>
      <button ref={buttonRef} onClick={() => setOpen(!open)} className="text-sky-600">
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
    <LessonBody>
      <LessonCard>
        <p>
          Modern React is filled with <Define>Hooks</Define>. They work with function-components and
          they give us an ability to use state and other React features similarly to class-based
          components.
        </p>
      </LessonCard>
    </LessonBody>
  )
}
