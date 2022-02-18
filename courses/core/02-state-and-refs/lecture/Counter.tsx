import { useState } from 'react'
import { Icon } from 'course-platform/Icon'

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
