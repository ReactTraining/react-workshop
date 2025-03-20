import React from 'react'
import * as ReactDOM from 'react-dom/client'
import { LessonBody, LessonCard } from '~/Lesson'

import { FaTrash } from 'react-icons/fa'

function Heading({ size, as: El, children }) {
  return <El className={`heading heading-size-${size}`}>{children}</El>
}

function App() {
  return (
    <LessonBody>
      <div className="flex gap-4">
        <div className="flex-1">
          <LessonCard>
            <Heading size={1} as="h3">
              <FaTrash color="red" />
              My Heading
              <FaTrash color="blue" />
            </Heading>
          </LessonCard>
        </div>
        <div className="flex-1">
          <LessonCard>Here</LessonCard>
        </div>
      </div>
    </LessonBody>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
