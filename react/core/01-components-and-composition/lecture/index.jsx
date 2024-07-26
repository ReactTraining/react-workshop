import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime'
import React from 'react'
import * as ReactDOM from 'react-dom/client'
import { LessonBody, LessonCard } from '~/Lesson'
import { Icon } from './examples/Icon'
import { FaTrash } from 'react-icons/fa'

function Heading({ as: El = 'h1', children, size = 1, icon, ...props }) {
  return (
    <El {...props} className={`heading heading-size-${size}`}>
      {children}
    </El>
  )
}

const App = () => {
  return (
    <LessonBody>
      <div className="flex gap-3">
        <div className="flex-1">
          <LessonCard>
            <Heading size={3}>
              <FaTrash color="red" />
              Here is my heading
              <FaTrash color="blue" />
            </Heading>
          </LessonCard>
        </div>
        <div className="flex-1">
          <LessonCard>here</LessonCard>
        </div>
      </div>
    </LessonBody>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
