import React from 'react'
import * as ReactDOM from 'react-dom/client'
// import { LessonBody, LessonCard } from '~/Lesson'
// import { Icon } from './examples/Icon'
import { FaUser } from 'react-icons/fa'

function Heading({ children, ...props }) {
  return (
    <h1 {...props} className="heading size-1">
      {children}
    </h1>
  )
}

function App() {
  return (
    <div>
      <Heading>
        <FaUser />
        This is my heading
      </Heading>
    </div>
  )
}

// this happens one time on the whole app
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(App())
