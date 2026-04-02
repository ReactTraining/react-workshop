// import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime'
import React from 'react'
import * as ReactDOM from 'react-dom/client'
import { LessonBody, LessonCard } from '~/Lesson'
import { Icon } from './examples/Icon'
import { FaUser } from 'react-icons/fa'

function Heading({ size, as: El, children }) {
  return <El className={`heading heading-size-${size}`}>{children}</El>
}

function App() {
  return (
    <LessonBody>
      <LessonCard>
        <Heading as="h4" size={2}>
          <FaUser />
          My Label
        </Heading>
      </LessonCard>
      <br />
      <LessonCard>Two</LessonCard>
    </LessonBody>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
