import * as React from 'react'
import { useState } from 'react'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import 'YesterTech/Quantity.scss'

function Quantity() {
  const [quantity, setQuantity] = useState(1)

  const handleAdd = () => {
    setQuantity(quantity + 1)
  }

  const handleRemove = () => {
    if (quantity === 0) return
    setQuantity(quantity - 1)
  }

  return (
    <div className="quantity-picker">
      <div>
        <div>
          <button
            type="button"
            className="icon-button"
            aria-label="Remove an item"
            onClick={handleRemove}
          >
            <FaMinusCircle />
          </button>
        </div>
        <div className="input-container">
          <input type="text" aria-label="quantity" value={quantity} readOnly />
        </div>
        <div>
          <button
            type="button"
            className="icon-button"
            aria-label="Add an item"
            onClick={handleAdd}
          >
            <FaPlusCircle />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Quantity
