import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { LessonBody, LessonCard } from '~/Lesson'
import { position } from './utils'

// const targetRect = targetRef.current.getBoundingClientRect()
// const popoverRect = popoverRef.current.getBoundingClientRect()
// setStyles(position(targetRect, popoverRect))

const Popover = ({ children }) => {
  return <div className="bg-black text-white rounded py-1 px-3">{children}</div>
}

const Define = ({ children }) => {
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
