// import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime'
import React from 'react'
import * as ReactDOM from 'react-dom/client'
import { LessonBody, LessonCard } from '~/Lesson'
import { Icon } from './examples/Icon'
import { FaTrash } from 'react-icons/fa'

function Heading({ children, as: El = 'h1', size = 1 }) {
  return <El className={`heading heading-size-${size}`}>{children}</El>
}

function App() {
  return (
    <LessonBody>
      <div className="flex gap-2">
        <div className="flex-1">
          <LessonCard>
            <Heading>
              <Icon name="star" />
              My Heading
            </Heading>
          </LessonCard>
        </div>
        <div className="flex-1">
          <LessonCard>Second</LessonCard>
        </div>
      </div>
    </LessonBody>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
