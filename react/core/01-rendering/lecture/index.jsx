import React from 'react'
import * as ReactDOM from 'react-dom/client'
// import { LessonBody, LessonCard } from '~/Lesson'
import { Icon } from './examples/Icon'

// Imperative Code: How you want it done (hands on) - if switch, for
// Declarative Code: What you want (less hands on)

function Heading({ children, size = 1, as: El = 'h1', ...props }) {
  return (
    <El {...props} className={`heading size-${size}`}>
      {children}
    </El>
  )
}

function App() {
  return (
    <div>
      <Heading size={3}>
        <Icon name="" />
        My Heading
      </Heading>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
