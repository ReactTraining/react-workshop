// import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime'
// import React from 'react'
import * as ReactDOM from 'react-dom/client'
import { LessonBody, LessonCard } from '~/Lesson'
import { Icon } from './examples/Icon'

function Heading({ as: El, size = 1, children }) {
  return <El className={`heading heading-size-${size}`}>{children}</El>
}

function App() {
  const someObject = { as: 'h2', size: 4 }

  return (
    <LessonBody>
      <div className="flex gap-4">
        <div className="flex-1">
          <LessonCard>
            <Heading {...someObject}>
              <Icon name="star" />
              My Heading
            </Heading>
          </LessonCard>
        </div>
        <div className="flex-1">
          <LessonCard>Other</LessonCard>
        </div>
      </div>
    </LessonBody>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
