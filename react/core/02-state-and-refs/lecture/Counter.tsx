// Read more about imports with React
// https://twitter.com/dan_abramov/status/1308739731551858689

import { useState } from 'react'
import { Icon } from '~/Icon'

// type CounterProps = {
//   count: number
//   setCount(count: number): void
//   min?: number
// }

export function Counter() {
  let count = 0

  return (
    <div className="counter inline-flex flex-gap">
      <div>
        <button className="button button-small">
          <Icon name="minus" />
        </button>
      </div>
      <div className="input">{count}</div>
      <div>
        <button className="button button-small">
          <Icon name="plus" />
        </button>
      </div>
    </div>
  )
}
