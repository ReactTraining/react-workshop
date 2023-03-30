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
  function onClick() {
    // logic for removing ...
  }

  return (
    <div>
      <Button onClick={onClick}>
        <FaTrash />
        <span>Remove Course</span>
        <FaTrash />
      </Button>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
