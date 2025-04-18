import React from 'react'
import * as ReactDOM from 'react-dom/client'
import { LessonBody, LessonCard } from '~/Lesson'
// import { Icon } from './examples/Icon'
import { FaTrash } from 'react-icons/fa'

function Heading({ size, children }) {
  return <h1 className={`heading heading-size-${size}`}>{children}</h1>
}

function App() {
  return (
    <LessonBody>
      <LessonCard>
        <Heading size={2}>
          <FaTrash color="red"></FaTrash>
          My Heading
          <FaTrash color="blue"></FaTrash>
        </Heading>
      </LessonCard>
    </LessonBody>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
