import * as React from 'react'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import 'YesterTech/Quantity.scss'

/**
 * BrowseProductItem
 */

export const BrowseProductItem: React.FC = () => {
  const [quantity, setQuantity] = React.useState(0)

  return (
    <div className="browse-product-item spacing-small">
      <h1>Nintendo</h1>
      <button
        className="button"
        onClick={() => {
          setQuantity(1)
        }}
      >
        Add To Cart
      </button>
      {quantity > 0 && (
        <div>
          <Quantity quantity={quantity} setQuantity={setQuantity} />
        </div>
      )}
    </div>
  )
}

/**
 * Quantity
 */

interface Props {
  quantity: number
  setQuantity: any
}

const Quantity: React.FC<Props> = ({ quantity, setQuantity }) => {
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
          <button onClick={subtract} type="button" className="icon-button">
            <FaMinusCircle />
          </button>
        </div>
        <div className="input-container">
          <input
            type="text"
            aria-label="quantity"
            value={quantity}
            onChange={event => {
              setQuantity(parseInt(event.target.value))
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
