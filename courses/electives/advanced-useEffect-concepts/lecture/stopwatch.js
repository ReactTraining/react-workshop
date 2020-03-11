import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

function App() {
  const [active, setActive] = useState(false)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    if (active) {
      setInterval(() => {
        console.log('Set Seconds')
        setSeconds(seconds + 1)
      }, 1000)
    }
    // Maybe we should take "seconds" out of the array? See what happens...
  }, [active, seconds])

  return (
    <div className="align-center spacing stopwatch">
      <div className="horizontal-spacing">
        <button className="button" onClick={() => setActive(true)}>
          Start
        </button>
        <button className="button" onClick={() => setActive(false)}>
          Stop
        </button>
      </div>
      <hr />
      <div>Seconds: {seconds}</div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
