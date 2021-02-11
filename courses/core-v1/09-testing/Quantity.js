import React, { useState } from 'react'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'

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

  function handleInputBlur(event) {
    if (event.target.value.trim() === '') {
      setQuantity(0)
    }
  }

  function handleInputKeyDown(event) {
    // keep cursor from going back/forth
    event.preventDefault()
    if (event.key === 'ArrowUp') {
      add()
    } else if (event.key === 'ArrowDown') {
      subtract()
    }
  }

  return (
    <div className="quantity-picker">
      <div>
        <div>
          <button
            onClick={subtract}
            type="button"
            className="icon-button"
            data-testid="subtract-button"
          >
            <FaMinusCircle />
          </button>
        </div>
        <div className="input-container">
          <input
            type="text"
            aria-label="quantity"
            value={quantity}
            data-testid="quantity"
            onChange={event => {
              setQuantity(event.target.value)
            }}
            onBlur={handleInputBlur}
            onKeyDown={handleInputKeyDown}
          />
        </div>
        <div>
          <button
            onClick={add}
            type="button"
            className="icon-button"
            data-testid="add-button"
          >
            <FaPlusCircle />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Quantity
