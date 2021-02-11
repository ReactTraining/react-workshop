import React, { useState } from 'react'
// import ReactDOM from 'react-dom'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import 'ProjectPlanner/Minutes.scss'

export const Minutes = () => {
  const minutes = 0

  return (
    <div className="minutes">
      <div>
        <button type="button">
          <FaMinusCircle />
        </button>
      </div>
      <div>{minutes}</div>
      <div>
        <button type="button">
          <FaPlusCircle />
        </button>
      </div>
    </div>
  )
}
