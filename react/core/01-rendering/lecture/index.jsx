import React from 'react'
import * as ReactDOM from 'react-dom/client'
import { LessonBody, LessonCard } from '~/Lesson'
import { Icon } from './examples/Icon'

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
        <Heading as="h3" size={4}>
          <Icon name="trash" size={1} />
          Heading
        </Heading>
      </LessonCard>
    </LessonBody>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
