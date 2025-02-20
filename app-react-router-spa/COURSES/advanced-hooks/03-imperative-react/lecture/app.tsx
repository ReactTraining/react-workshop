import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { position } from './utils'

type PopoverProps = {
  children: React.ReactNode
  // targetRef: { current: HTMLElement }
} & React.HTMLAttributes<HTMLDivElement>

function Popover({ children, ...props }: PopoverProps) {
  // const targetRect = targetRef.current.getBoundingClientRect()
  // const popoverRect = popoverRef.current.getBoundingClientRect()
  // setStyles(position(targetRect, popoverRect))
  return (
    <div {...props} className="bg-black text-white rounded py-1 px-3">
      {children}
    </div>
  )
}

type DefineProps = { children: React.ReactNode }
function Define({ children }: DefineProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button onClick={() => setOpen(!open)} className="text-sky-600">
        {children}
      </button>
      {open && <Popover>Hooks are a way to compose behavior into components</Popover>}
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
