import { useState } from 'react'
import * as ReactDOM from 'react-dom/client'
import { Icon } from '~/Icon'

// const states = []

// let index = -1

// function useState(value) {
//   index++

//   if (states[index]) {
//     return states[index]
//   }

//   // Initiation (once)

//   function updater(newValue) {
//     states[index][0] = newValue
//     index = -1
//     reRender()
//   }

//   const state = [value, updater]
//   states[index] = state
//   return state
// }

// function reRender() {
//   ReactDOM.createRoot(document.getElementById('root')!).render(<Counter />)
// }

interface Props {
  count: number
  setCount(count: number): void
}

export function Counter({ count, setCount }: Props) {
  const error = count < 0 ? 'Cannot be less than 0' : ''

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
