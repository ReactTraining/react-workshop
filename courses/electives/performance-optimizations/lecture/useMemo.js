import * as React from 'react'
import slowFunction from './utils/slowFunction'

export default function App() {
  const [count, setCount] = React.useState(0)

  const input = count >= 5 // Let's change the input to the slow function

  console.time()
  const x = slowFunction(input)
  console.timeEnd()

  return (
    <div className="align-center">
      <button className="button" onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      <p>
        Notice the delay when we click!
        <br />
        <code>slowFunction</code> loops to {x}
      </p>
    </div>
  )
}
