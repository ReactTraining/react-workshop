import React from 'react'
import * as ReactDOM from 'react-dom/client'
import { LessonBody, LessonCard } from '~/Lesson'
import { Icon } from './examples/Icon'

function Heading({ children, size = 1, as: Comp = 'h1', ...props }) {
  return (
    <Comp {...props} className={`heading heading-size-${size}`}>
      {children}
    </Comp>
  )
}

function App() {
  return (
    <LessonBody>
      <div className="flex gap-3">
        <div className="flex-1">
          <LessonCard>
            <Heading size={1} id="heading">
              <Icon name="star" />
              My Heading
            </Heading>
          </LessonCard>
        </div>
        <div className="flex-1">
          <LessonCard>Second</LessonCard>
        </div>
      </div>
    </LessonBody>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
