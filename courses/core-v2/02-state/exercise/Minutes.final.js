import React, { useState, Fragment } from 'react'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import 'ProjectPlanner/Minutes.scss'

export const Minutes = ({ minutes, min = 0, setMinutes }) => {
  function subtract() {
    if (minutes > min) {
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
