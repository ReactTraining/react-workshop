// import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime'
import React from 'react'
import * as ReactDOM from 'react-dom/client'
import { LessonBody, LessonCard } from '~/Lesson'
import { Icon } from './examples/Icon'
import { FaTrash } from 'react-icons/fa'

function Heading({ as: El = 'h1', children, size = 1, ...props }) {
  return (
    <El {...props} className={`heading heading-size-${size}`}>
      {children}
    </El>
  )
}

function IconText({ children, icon: Icon }) {
  return (
    <div className="flex gap-2 items-center">
      <Icon />
      <span className="flex-1">{children}</span>
    </div>
  )
}

function App() {
  return (
    <LessonBody>
      <div className="flex flex-col lg:flex-row gap-5">
        <div className="flex-1">
          <LessonCard>
            <Heading id="foo">
              <IconText icon={FaTrash}>My Heading</IconText>
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
