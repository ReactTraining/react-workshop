import React from 'react'
import * as ReactDOM from 'react-dom/client'
import { LessonBody, LessonCard } from '~/Lesson'
import { Icon } from './examples/Icon'
import { FaTrash } from 'react-icons/fa'

function Heading({ children, size = 1, ...x }) {
  return (
    <h1 {...x} className={`heading heading-size-${size}`}>
      {children}
    </h1>
  )
}

function App() {
  return (
    <div>
      <Heading id="sdsdfs">
        <FaTrash />
        My Heading
      </Heading>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
