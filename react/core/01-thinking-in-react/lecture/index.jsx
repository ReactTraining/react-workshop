import React from 'react'
import * as ReactDOM from 'react-dom/client'
import { FaTrash } from 'react-icons/fa'
import './styles.scss'

function Button({ onClick, children, settings }) {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  )
}

function App() {
  return (
    <div>
      <Button onClick={() => {}} label="Remove Course">
        <FaTrash />
        <span>Remove Course</span>
        <FaTrash />
      </Button>
    </div>
  )
}

// React 18
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
