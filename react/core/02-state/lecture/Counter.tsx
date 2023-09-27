import { useState } from 'react'
import { Icon } from '~/Icon'

// type Props = {
//   count: number
//   setCount(count: number): void
// }

export function Counter() {
  let count = 0

  return (
    <div className="flex">
      <button className="button flex-1">
        <Icon name="minus" />
      </button>
      <span className="align-middle text-3xl px-6">0</span>
      <button className="button flex-1">
        <Icon name="plus" />
      </button>
    </div>
  )
}
