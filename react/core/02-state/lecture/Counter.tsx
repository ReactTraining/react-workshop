import { useState, Fragment } from 'react'
import { Icon } from '~/Icon'

type Props = {
  count: number
  setCount(count: number): void
}

export function Counter({ count, setCount }: Props) {
  // Derived state in react ("computed")
  const error = count < 0 ? 'cannot be less than 0' : null

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
        <span className="align-middle text-3xl px-6">{count}</span>
        <button onClick={add} className="button flex-1">
          <Icon name="plus" />
        </button>
      </div>
      {error && <p>{error}</p>}
    </>
  )
}
