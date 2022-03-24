import { useState } from 'react'
import { Icon } from 'course-platform/Icon'

// type CounterProps = {
//   count: number
//   setCount(count: number): void
//   min?: number
// }

export function Counter({ count, setCount }) {
  const [error, setError] = useState<string | null>(null) // 1

  function subtract() {
    setCount(count - 1)
    if (count - 1 < 0) {
      setError('Cannot be less than 0')
    }
  }

  function add() {
    setCount(count + 1)
  }

  return (
    <>
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
      {error && <p>{error}</p>}
    </>
  )
}
