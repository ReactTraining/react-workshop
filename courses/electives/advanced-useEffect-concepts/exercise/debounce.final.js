import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { saveClapsToDatabase } from './utils'

function App() {
  const [claps, setClaps] = useState(0)
  const [queueClaps, setQueueClaps] = useState(0)

  useEffect(() => {
    if (queueClaps > 0) {
      const id = setTimeout(() => {
        saveClapsToDatabase(queueClaps).then(latestClaps => {
          setClaps(latestClaps)
          setQueueClaps(0)
        })
      }, 1000)
      return () => clearTimeout(id)
    }
  }, [queueClaps])

  const clap = () => {
    setQueueClaps(queueClaps + 1)
  }

  return (
    <div className="align-center spacing debounce">
      <button onClick={clap} className="button">
        Clap
      </button>
      <hr />
      <div className="horizontal-spacing">
        <span>Queue Claps: {queueClaps}</span>
        <span>Claps: {claps}</span>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

// One of our instructors wrote a blog article on this exact topic of "debouncing claps":
// https://reacttraining.com/blog/blog-claps-and-lessons-on-hooks/
