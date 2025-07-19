import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { position } from './utils'

function Portal({ children }: { children: React.ReactNode }) {
  const [node, setNode] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    const node = document.createElement('div')
    document.body.append(node)
    setNode(node)
    return () => {
      document.body.removeChild(node)
    }
  }, [])

  return node ? createPortal(children, node) : null
}

type PopoverProps = {
  children: React.ReactNode
  targetRef: { current: HTMLElement }
} & React.HTMLAttributes<HTMLDivElement>

function Popover({ children, targetRef, ...props }: PopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null!)
  const [styles, setStyles] = useState({})

  function initRef(node: HTMLDivElement) {
    if (node && popoverRef.current === null) {
      popoverRef.current = node
      const targetRect = targetRef.current.getBoundingClientRect()
      const popoverRect = popoverRef.current.getBoundingClientRect()
      setStyles(position(targetRect, popoverRect)) // viewport collision detection
    }
  }

  return (
    <Portal>
      <div
        ref={initRef}
        {...props}
        style={{ ...styles, position: 'absolute' }}
        className="bg-black text-white rounded py-1 px-3"
      >
        {children}
      </div>
    </Portal>
  )
}

type DefineProps = { children: React.ReactNode }

function Define({ children }: DefineProps) {
  const [open, setOpen] = useState(false)

  const buttonRef = useRef<HTMLButtonElement>(null!)

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
    <div>
      <p>
        Modern React is filled with <Define>Hooks</Define>. They work with function-components and
        they give us an ability to use state and other React features similarly to class-based
        components.
      </p>
    </div>
  )
}
