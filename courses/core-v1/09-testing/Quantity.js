import * as React from 'react'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'

function Quantity() {
  const [quantity, setQuantity] = React.useState(0)

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
    if (event.key === 'ArrowUp') {
      // keep cursor from going back/forth
      event.preventDefault()
      add()
    } else if (event.key === 'ArrowDown') {
      // keep cursor from going back/forth
      event.preventDefault()
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
            aria-label="Remove an item"
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
            onChange={(event) => {
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
            aria-label="Add an item"
          >
            <FaPlusCircle />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Quantity
