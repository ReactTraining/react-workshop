import React from 'react'
import * as ReactDOM from 'react-dom/client'
import { FaTrash } from 'react-icons/fa'
import './styles.scss'

function Button({ onClick, children }) {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  )
}

// imperative: how (more details) if for while
// declarative: what

function App() {
  const courses = [
    { id: 1, name: 'HTML' },
    { id: 2, name: 'CSS' },
    { id: 3, name: 'JS' },
  ]

  const onClick = () => {
    console.log('logic for removing a course')
  }

  return (
    <div>
      {courses.map((course) => {
        return (
          <div key={course.id}>
            <h1>{course.name}</h1>
            <Button onClick={onClick}>
              <FaTrash />
              <span>Remove Course</span>
            </Button>
          </div>
        )
      })}
    </div>
  )
}

// React 18
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
