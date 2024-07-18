import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime'
import React from 'react'
import * as ReactDOM from 'react-dom/client'
import { LessonBody, LessonCard } from '~/Lesson'
import { Icon } from './examples/Icon'
import { FaUser } from 'react-icons/fa'

function Heading({ as: El, children, size = 1 }) {
  return <El className={`heading heading-size-${size}`}>{children}</El>
}

function App() {
  return (
    <div>
      <Heading as="h3">
        <FaUser />
        Here is my label
        <FaUser />
      </Heading>
    </div>
  )
}

// React 18
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(App())
