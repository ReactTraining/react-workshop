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

function App() {
  function onClick() {
    // logic for removing...
  }

  const courses = [
    { id: 1, name: 'HTML' },
    { id: 2, name: 'CSS' },
    { id: 3, name: 'JS' },
  ]

  return (
    <div>
      {courses.map((course) => {
        return (
          <div key={course.id}>
            <h1>Course Name</h1>
            <Button onClick={onClick}>
              <FaTrash />
              Remove Course
            </Button>
          </div>
        )
      })}
      <form action=""></form>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
