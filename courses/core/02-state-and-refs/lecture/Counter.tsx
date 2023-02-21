// Read more about imports with React
// https://twitter.com/dan_abramov/status/1308739731551858689

import { useState, Fragment } from 'react'
import { Icon } from 'course-platform/Icon'

// type CounterProps = {
//   count: number
//   setCount(count: number): void
//   min?: number
// }

export function Counter({ min = 0 }) {
  const [count, setCount] = useState(0)

  function subtract() {
    if (count > min) {
      setCount(count - 1)
    }
  }

  function add() {
    setCount(count + 1)
  }

  return (
    <div className="counter inline-flex flex-gap">
      <div>
        <button onClick={subtract} className="button button-small">
          <Icon name="minus" />
        </button>
      </div>
      <div className="input">{count}</div>
      <div>
        <button onClick={add} className="button button-small">
          <Icon name="plus" />
        </button>
      </div>
    </div>
  )
}
