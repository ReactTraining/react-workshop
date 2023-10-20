import React from 'react'
import * as ReactDOM from 'react-dom/client'
import { LessonBody, LessonCard } from '~/Lesson'
import { Icon } from './examples/Icon'
import { FaUser } from 'react-icons/fa'

function Heading({ as: El, size = 1, children, ...props }) {
  return (
    <El {...props} className={`heading size-${size}`}>
      {children}
    </El>
  )
}

function App() {
  return (
    <LessonBody>
      <LessonCard>
        <Heading as="h4">
          <Icon name="star" />
          My Heading
        </Heading>
      </LessonCard>
    </LessonBody>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
