import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

function App() {
  const [count, setCount] = useState(0)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    if (saving) {
      setTimeout(() => {
        setMessage(`We saved a count of ${count}`)
        setSaving(false)
      }, 3000)
    }
    // 👇🏼 showing with and without count reveals some characteristics of useEffect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saving])

  function saveToDatabase() {
    setSaving(true)
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

ReactDOM.render(<App />, document.getElementById('root'))
