import React, { useState } from 'react'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import 'YesterTech/Quantity.scss'

export default function Quantity() {
  const quantity = 1

  return (
    <div className="quantity-picker">
      <div>
        <div>
          <button type="button" className="icon-button">
            <FaMinusCircle />
          </button>
        </div>
        <div className="input-container">{quantity}</div>
        <div>
          <button type="button" className="icon-button">
            <FaPlusCircle />
          </button>
        </div>
      </div>
    </div>
  )
}
