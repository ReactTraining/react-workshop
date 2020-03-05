import React, { useState } from 'react'
import { reallyLongRunningFunction } from './utils'

export default function App() {
  const [count, setCount] = useState(0)

  console.time()
  reallyLongRunningFunction()
  console.timeEnd()

  return (
    <div className="align-center">
      <button className="button" onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      <p>Notice the delay when we click!</p>
    </div>
  )
}
