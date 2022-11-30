import React from 'react'
import * as ReactDOM from 'react-dom/client'
import { FaTrash } from 'react-icons/fa'
import './styles.scss'

function Button({ children, onClick }) {
  return (
    <button onClick={onClick} className="button" type="button">
      {children}
    </button>
  )
}

function App() {
  const courses = [
    { id: 1, name: 'HTML' },
    { id: 2, name: 'CSS' },
    { id: 3, name: 'JS' },
  ]

  function onClick() {
    console.log('logic for removing a course')
  }

  return (
    <div>
      {courses.map((course) => {
        return (
          <div>
            <h1>{course.name}</h1>
            <Button onClick={onClick} disabled={course.tempId}>
              <FaTrash />
              <span>Remove Course</span>
            </Button>
          </div>
        )
      })}

      <form action="">
        <input type="text" />
      </form>
    </div>
  )
}

// React 18
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
