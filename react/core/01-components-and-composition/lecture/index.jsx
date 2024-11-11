import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime'
import React from 'react'
import * as ReactDOM from 'react-dom/client'
import { LessonBody, LessonCard } from '~/Lesson'
import { Icon } from './examples/Icon'
import { FaTrash } from 'react-icons/fa'

function Heading({ as: El = 'h1', children, size = 1, className, ...props }) {
  return (
    <El {...props} className={`${className} heading heading-size-${size}`}>
      {children}
    </El>
  )
}

function App() {
  function onClick() {
    console.log('i was clicked')
  }

  return (
    <LessonBody>
      <div className="flex flex-col gap-3">
        <div>
          <LessonCard>
            <Heading>
              <Icon name="star" />
              My Heading
            </Heading>
          </LessonCard>
        </div>
        <div>
          <LessonCard>
            <button className="button" onClick={onClick}>
              Click Me
            </button>
          </LessonCard>
        </div>
      </div>
    </LessonBody>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)

// Imperative Programming (much more hands on, how it works)
// Declarative: (much less hands on, describe what you want)
