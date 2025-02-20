import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { position } from './utils'

type PortalProps = { children: React.ReactNode }
function Portal({ children }: PortalProps) {
  const [portalNode, setPortalNode] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const portalNode = document.createElement('div')
    document.body.appendChild(portalNode)
    setPortalNode(portalNode)
    return () => {
      document.body.removeChild(portalNode)
    }
  }, [])

  return portalNode ? createPortal(children, portalNode) : null
}

type PopoverProps = {
  children: React.ReactNode
  targetRef: { current: HTMLElement }
} & React.HTMLAttributes<HTMLDivElement>

function Popover({ children, targetRef, ...props }: PopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null!)
  const [styles, setStyles] = useState({})

  // Doing this work in a ref callback helps overcome a race-condition where
  // we need to ensure the popoverRef has been established. It's established
  // later than we might expect because the div it's applied to is the children
  // of Portal which returns null initially (which it must do)
  function initPopoverRef(el: HTMLDivElement) {
    // initPopoverRef will be called numerous times, let's do this work once.
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

type DefineProps = { children: React.ReactNode }
function Define({ children }: DefineProps) {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null!)

  useEffect(() => {
    const listener = (event: Event) => {
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
    <div>
      <p>
        Modern React is filled with <Define>Hooks</Define>. They work with function-components and
        they give us an ability to use state and other React features similarly to class-based
        components.
      </p>
    </div>
  )
}
