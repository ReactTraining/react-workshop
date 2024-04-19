import { useState } from 'react'
import { Icon } from '~/Icon'

type Props = {
  count: number
  setCount(x: number): void
  min?: number
}

export function Counter({ count, setCount, min = 0 }: Props) {
  function subtract() {
    if (count > min) {
      setCount(count - 1)
    }
  }

  function add() {
    setCount(count + 1)
  }

  return (
    <div className="flex">
      <button onClick={subtract} className="button flex-1">
        <Icon name="minus" />
      </button>
      <span className="align-middle text-3xl px-6">{count}</span>
      <button onClick={add} className="button flex-1">
        <Icon name="plus" />
      </button>
    </div>
  )
}
