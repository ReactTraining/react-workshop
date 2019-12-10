import React from 'react'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import 'YesterTech/Quantity.scss'

export default function Quantity({ quantity, setQuantity }) {
  const tooSmall = quantity < 0

  function subtract() {
    setQuantity(quantity - 1)
  }

  function add() {
    setQuantity(quantity + 1)
  }

  return (
    <div className={'quantity-picker' + (tooSmall ? ' quantity-picker-error' : '')}>
      <div>
        <div>
          <button type="button" className="icon-button" onClick={subtract}>
            <FaMinusCircle />
          </button>
        </div>
        <div className="input-container">{quantity}</div>
        <div>
          <button type="button" className="icon-button" onClick={add}>
            <FaPlusCircle />
          </button>
        </div>
      </div>
    </div>
  )
}
