import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime'
import React from 'react'
import * as ReactDOM from 'react-dom/client'
import { LessonBody, LessonCard } from '~/Lesson'
import { Icon } from './examples/Icon'
import { FaTrash, FaStar } from 'react-icons/fa'

function Heading({ as: El = 'h1', children, size = 1, ...props }) {
  return (
    <El {...props} className={`heading heading-size-${size}`}>
      {children}
    </El>
  )
}

function App() {
  return (
    <LessonBody>
      <div className="user-list flex gap-6 max-lg:flex-col">
        <div className="lg:flex-1">
          <LessonCard>
            <Heading as="h2">
              My Heading
              <FaStar />
            </Heading>
          </LessonCard>
        </div>
        <div className="lg:flex-1">
          <LessonCard>Second</LessonCard>
        </div>
      </div>
    </LessonBody>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
