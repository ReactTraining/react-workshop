import React, { useState, useEffect } from 'react'
import './styles.scss'

export default function App() {
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState(null)

  function saveToDatabase() {
    setTimeout(() => {
      setMessage(
        `We saved a count of ${count}, but it is stale since the count state may have changed`
      )
    }, 3000)
  }

  return (
    <div className="align-center spacing closure-basics">
      <button className="button" onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      <hr />
      <button className="button" onClick={saveToDatabase}>
        Save Count to Database
      </button>
      {message && <p>{message}</p>}
    </div>
  )
}
