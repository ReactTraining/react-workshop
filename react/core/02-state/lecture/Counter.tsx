import { useState } from 'react'
import { flushSync } from 'react-dom'
import { Icon } from '~/Icon'

interface Props {
  count: number
  setCount(x: number): void
}

export function Counter({ count, setCount }: Props) {
  // Derived state (aka computed state)
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
