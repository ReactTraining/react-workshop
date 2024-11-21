import { useState } from 'react'
import { Icon } from '~/Icon'

type Props = {
  count: number
  setCount(count: number): void
}

export function Counter({ count, setCount }: Props) {
  const error = count < 0 ? 'Cannot be less than 0' : null

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
      {error && <div>{error}</div>}
    </>
  )
}
