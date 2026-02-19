import { useState } from 'react'
import { Icon } from '~/Icon'

// type Props = {
//   count: number
//   setCount(count: number): void
// }

export function Counter({ count, setCount }) {
  const error = count < 0 ? 'Cannot be less than 0' : null

  function subtract() {
    setCount(count - 1) // queue
  }

  function add() {
    setCount(count + 1)
  }

  return (
    <>
      <div className="flex">
        <button className="button flex-1" onClick={subtract}>
          <Icon name="minus" />
        </button>
        <span className="align-middle text-3xl px-6 w-24 text-center">{count}</span>
        <button className="button flex-1" onClick={add}>
          <Icon name="plus" />
        </button>
      </div>

      {error && <p>{error}</p>}
    </>
  )
}
