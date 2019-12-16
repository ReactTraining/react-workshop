import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import 'YesterTech/Quantity.scss'

export default function Quantity({ onChange }) {
  const [quantity, setQuantity] = useState(1)
  const tooSmall = quantity < 0

  function subtract() {
    setQuantity(quantity - 1)
    if (onChange) {
      onChange(quantity - 1)
    }
  }

  function add() {
    setQuantity(quantity + 1)
    if (onChange) {
      onChange(quantity + 1)
    }
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

Quantity.propTypes = {
  onChange: PropTypes.func,
}
