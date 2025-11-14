// import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime'
import React from 'react'
import * as ReactDOM from 'react-dom/client'
// import { LessonBody, LessonCard } from '~/Lesson'
// import { Icon } from './examples/Icon'
// import { FaTrash } from 'react-icons/fa'

// Fn that returns a blueprint for UI (an object)
// You have to invoke that fn correctly
function Heading({ size, label, as: El, ...rest }) {
  return (
    <El {...rest} className={`heading heading-size-${size}`}>
      {label}
    </El>
  )

  // jsx(El) // string means make DOM <h2>
}

function App() {
  return (
    <div>
      <Heading as="h4" label="My Heading Again" size={2} />
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
