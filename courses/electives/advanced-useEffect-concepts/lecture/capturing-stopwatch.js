import React, { useState, useEffect } from 'react'

function App() {
  const [active, setActive] = useState(false)
  const [second, setSecond] = useState(0)

  useEffect(() => {
    if (active) {
      setInterval(() => {
        console.log('setSecond')
        setSecond(second + 1)
      }, 1000)
    }
  }, [active])

  return (
    <div className="align-center spacing">
      <div className="horizontal-spacing">
        <button className="button" onClick={() => setActive(true)}>
          Start
        </button>
        <button className="button" onClick={() => setActive(false)}>
          Stop
        </button>
      </div>
      <hr />
      <div>Seconds: {second}</div>
    </div>
  )
}

export default App
