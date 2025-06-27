import { useState, Fragment } from 'react'
import { Icon } from '~/Icon'

type Props = {
  count: number
  setCount(count: number): void
}

/*** Meta data for the comp instance (el)
state = [
  [-1, fn],
]
*/

export function Counter({ count, setCount }: Props) {
  const error = count < 0 ? 'cannot be less than 0' : ''

  function subtract() {
    setCount(count - 1)
  }

  function add() {
    setCount(count + 1)
  }

  return (
    <>
      <div className="flex">
        <button onClick={subtract} className="button flex-1">
          <Icon name="minus" />
        </button>
        <span className="align-middle text-3xl px-6 w-24 text-center">{count}</span>
        <button onClick={add} className="button flex-1">
          <Icon name="plus" />
        </button>
      </div>
      {error && <p>{error}</p>}
    </>
  )
}
