import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { position } from './utils'

type PortalProps = {
  children: React.ReactNode
}

function Portal({ children }: PortalProps) {
  const [node, setNode] = useState<null | HTMLDivElement>(null)

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

type PopoverProps = {
  children: React.ReactNode
  targetRef: { current: HTMLElement }
} & React.HTMLAttributes<HTMLDivElement>

function Popover({ children, targetRef, ...props }: PopoverProps) {
  const [styles, setStyles] = useState({})

  const popoverRef = useRef<HTMLDivElement>(null!)

  function initRef(node: HTMLDivElement) {
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
        {...props}
        style={{ position: 'absolute', ...styles }}
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
