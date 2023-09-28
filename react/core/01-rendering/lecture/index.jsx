import React from 'react'
import * as ReactDOM from 'react-dom/client'
import { LessonBody, LessonCard } from '~/Lesson'
import { Icon } from './examples/Icon'
import { Heading } from './examples/Heading'

function App() {
  return (
    <LessonBody>
      <LessonCard>
        <Heading as="h1">
          <Icon name="trash" />
          My Heading
        </Heading>
      </LessonCard>
    </LessonBody>
  )
}

// React 18
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
