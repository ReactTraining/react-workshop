import React, { useState } from 'react'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import 'YesterTech/Quantity.scss'

function Quantity() {
  const [quantity, setQuantity] = useState(0)

  function subtract() {
    if (quantity > 0) {
      setQuantity(quantity - 1)
    }
  }

  function add() {
    setQuantity(quantity + 1)
  }

  return (
    <div className="quantity-picker">
      <div>
        <div>
          <button
            onClick={subtract}
            type="button"
            className="icon-button"
          >
            <FaMinusCircle />
          </button>
        </div>
        <div className="input-container">
          <input
            type="text"
            aria-label="quantity"
            value={quantity}
            onChange={event => {
              setQuantity(event.target.value)
            }}
          />
        </div>
        <div>
          <button onClick={add} type="button" className="icon-button">
            <FaPlusCircle />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Quantity
