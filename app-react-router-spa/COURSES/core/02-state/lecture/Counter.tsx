import { useState } from 'react'
import { Icon } from '~/Icon'

// type Props = {
//   count: number
//   setCount(count: number): void
// }

/* 
state = [
  [-1, fn]

]
*/

export function Counter() {
  const [count, setCount] = useState(0)

  const error = count < 0 ? 'Cannot be...' : ''

  function subtract() {
    setCount(count - 1)
  }

  function add() {}

  return (
    <>
      <Other></Other>
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

function Other() {
  console.log('render')
  return <div></div>
}
