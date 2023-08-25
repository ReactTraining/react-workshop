// Read more about imports with React
// https://twitter.com/dan_abramov/status/1308739731551858689

import { useState, Fragment } from 'react'
import * as ReactDOM from 'react-dom/client'
import { Icon } from '~/Icon'

type CounterProps = {
  count: number
  setCount(count: number): void
  min?: number
}

export function Counter({ min = 0, count, setCount }: CounterProps) {
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
      <input
        type="text"
        value={count}
        onChange={(event) => {
          setCount(parseInt(event.target.value))
        }}
      />
      <div>
        <button onClick={add} className="button button-small">
          <Icon name="plus" />
        </button>
      </div>
    </div>
  )
}
