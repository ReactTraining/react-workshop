import React from 'react'
import * as ReactDOM from 'react-dom/client'
// import { LessonBody, LessonCard } from '~/Lesson'
import { Icon } from './examples/Icon'
// import { FaUser } from 'react-icons/fa'

function Heading({ as: El = 'h1', children, size = 1, ...props }) {
  return (
    <El {...props} className={`heading size-${size}`}>
      {children}
    </El>
  )
}

function App() {
  return (
    <div>
      <Heading>
        <Icon name="" />
        My Heading
      </Heading>
    </div>
  )
}

// React 18
ReactDOM.createRoot(document.getElementById('root')).render(<App />)
