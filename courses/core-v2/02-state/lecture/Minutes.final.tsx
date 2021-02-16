import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import 'ProjectPlanner/Minutes.scss'

// We can explain how DefinitelyTyped gives us type definitions on libraries like
// React that were written in JS. For example, how useState can infer the argument
// is going to be the first thing in the array returned.
// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/v16/index.d.ts#L920

type State = [any, (value: any) => void]

const states: State[] = []
let calls = -1

function useState(value: any) {
  const call = ++calls

  if (states[call]) {
    return states[call]
  }

  function setState(newValue: any): void {
    states[call][0] = newValue
    reRender()
  }

  const state: State = [value, setState]
  states[call] = state
  return state
}

function reRender() {
  calls = -1
  ReactDOM.render(<Minutes />, document.getElementById('root'))
}

export const Minutes = () => {
  const [minutes, setMinutes] = useState(0)
  const [error, setError] = useState('')

  function subtract() {
    setMinutes(minutes - 1)
    if (minutes - 1 < 0) {
      setError('Cannot be less than 1')
    }
  }

  function add() {
    setMinutes(minutes + 1)
    if (minutes + 1 >= 0) {
      setError('')
    }
  }

  return (
    <Fragment>
      <div className="minutes">
        <div>
          <button type="button" onClick={subtract}>
            <FaMinusCircle />
          </button>
        </div>
        <input
          type="text"
          value={minutes}
          onChange={(event) => setMinutes(parseInt(event.target.value))}
        />
        <div>
          <button type="button" onClick={add}>
            <FaPlusCircle />
          </button>
        </div>
      </div>
      {error && <p>{error}</p>}
    </Fragment>
  )
}
