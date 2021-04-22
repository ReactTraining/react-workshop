import * as React from 'react'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import 'YesterTech/Quantity.scss'

type QuantityState = { quantity: number }
type QuantityActions = { type: 'SUBTRACT' } | { type: 'ADD' } | { type: 'INPUT'; quantity: number }

function Quantity(): React.ReactElement {
  const [state, dispatch] = React.useReducer(
    function QuantityReducer(state: QuantityState, action: QuantityActions): QuantityState {
      switch (action.type) {
        case 'SUBTRACT': {
          return { quantity: state.quantity - 1 }
        }
        case 'ADD': {
          return { quantity: state.quantity + 1 }
        }
        case 'INPUT': {
          return { quantity: action.quantity }
        }
        default:
          return state
      }
    },
    { quantity: 0 }
  )

  const { quantity } = state

  function subtract() {
    if (quantity > 0) {
      dispatch({ type: 'SUBTRACT' })
    }
  }

  function add() {
    dispatch({ type: 'ADD' })
  }

  return (
    <div className="quantity-picker">
      <div>
        <div>
          <button
            onClick={subtract}
            type="button"
            className="icon-button"
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
            onChange={(e) => dispatch({ type: 'INPUT', quantity: parseInt(e.target.value) })}
          />
        </div>
        <div>
          <button onClick={add} type="button" className="icon-button" aria-label="Add an item">
            <FaPlusCircle />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Quantity
