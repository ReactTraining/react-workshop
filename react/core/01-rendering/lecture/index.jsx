import React from 'react'
import * as ReactDOM from 'react-dom/client'
import { LessonBody, LessonCard } from '~/Lesson'
import { Icon } from './examples/Icon'
import { FaTrash } from 'react-icons/fa'

function Header({ children, as: El = 'h1', size = 1, ...props }) {
  return (
    <El className={`heading size-${size}`} {...props}>
      {children}
    </El>
  )
}

function App() {
  return (
    <LessonBody>
      <div className="flex gap-6 max-lg:flex-col">
        <div className="lg:flex-1">
          <LessonCard>
            <Header size={1}>
              <Icon name="trash" />
              Hello World
            </Header>
          </LessonCard>
        </div>
        <div className="lg:flex-1">
          <LessonCard>
            <Header size={1}>
              <Icon name="trash" />
              Hello World
            </Header>
          </LessonCard>
        </div>
      </div>
    </LessonBody>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
