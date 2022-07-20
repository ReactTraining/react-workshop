import React from 'react'
import * as ReactDOM from 'react-dom/client'
import { FaTrash } from 'react-icons/fa'
import './styles.scss'

function Button({ onClick, children }) {
  return (
    <button onClick={onClick} type="button" className="button">
      {children}
    </button>
  )
}

function App() {
  const data = [
    { id: 1, name: 'HTML' },
    { id: 2, name: 'CSS' },
    { id: 3, name: 'JS' },
    { id: 4, name: 'new name' },
  ]

  function onClick() {
    console.log('remove course')
  }

  return (
    <div>
      {data.map((course) => {
        return (
          <div key={data.id}>
            <h1>{course.name}</h1>
            <Button onClick={onClick}>
              <FaTrash color="red" />
              <span>Remove Course</span>
            </Button>
          </div>
        )
      })}
      <div>
        <form action="">
          <input type="text" />
        </form>
      </div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
