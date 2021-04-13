import * as React from 'react'
import { useState } from 'react'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import 'YesterTech/Quantity.scss'

export default function Quantity() {
  const [quantity, setQuantity] = useState(1)
  const [error, setError] = useState(null)

  const handleAdd = () => {
    setQuantity(quantity + 1)
    setError(null)
  }
  const handleRemove = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1)
    } else {
      setError('Quantity must be greater than 0')
    }
  }

  return (
    <>
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
          <div className="input-container">{quantity}</div>
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
      {error && (
        <p>
          {error}{' '}
          <span role="img" aria-label="yikes">
            😬
          </span>
        </p>
      )}
    </>
  )
}
