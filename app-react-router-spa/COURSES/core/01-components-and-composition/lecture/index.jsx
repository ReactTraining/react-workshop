// import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime'
import React from 'react'
import * as ReactDOM from 'react-dom/client'
import { LessonBody, LessonCard } from '~/Lesson'
import { Icon } from './examples/Icon'
import { FaTrash } from 'react-icons/fa'

function Heading({ size = 1, children, ...props }) {
  return (
    <h1 {...props} className={`heading heading-size-${size}`}>
      {children}
    </h1>
  )
}

function App() {
  return (
    <LessonBody>
      <div className="flex gap-4">
        <div className="flex-1">
          <LessonCard>
            <Heading size={2}>
              <FaTrash />
              My Heading
            </Heading>
          </LessonCard>
        </div>
        <div className="flex-1">
          <LessonCard>Two</LessonCard>
        </div>
      </div>
    </LessonBody>
  )
}

const el = document.getElementById('root')
const root = ReactDOM.createRoot(el)
root.render(<App />)

// <div></div> jsx('div') // string tells react to make DOM
// <App></App> jsx(App) // non string tells react to invoke
