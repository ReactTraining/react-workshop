import React, { useState, Fragment } from 'react'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import 'ProjectPlanner/Minutes.scss'

// When you "lift" this state up, you'll pass down `minutes` and `setMinutes`
// as props. The rest of this component doesn't care that those things came
// from a local useState before or from props.
export const Minutes = () => {
  // Lift this state
  const [minutes, setMinutes] = useState(0)

  function subtract() {
    if (minutes > 0) {
      setMinutes(minutes - 1)
    }
  }

  function add() {
    setMinutes(minutes + 1)
  }

  return (
    <div className="minutes">
      <div>
        <button type="button" onClick={subtract}>
          <FaMinusCircle />
        </button>
      </div>
      <div>{minutes}</div>
      <div>
        <button type="button" onClick={add}>
          <FaPlusCircle />
        </button>
      </div>
    </div>
  )
}
