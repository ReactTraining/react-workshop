// Read more about imports with React
// https://twitter.com/dan_abramov/status/1308739731551858689

import { useState } from 'react'
import { Icon } from 'course-platform/Icon'

type CounterProps = {
  count: number
  setCount(count: number): void
}

export function Counter({ count, setCount }: CounterProps) {
  const error = count < 0 ? 'Cannot be negative' : null

  function subtract() {
    setCount(count - 1)
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
        <input type="text" value={count} onChange={(e) => setCount(parseInt(e.target.value))} />
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
