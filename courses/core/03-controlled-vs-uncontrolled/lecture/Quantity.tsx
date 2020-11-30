import * as React from "react";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import "YesterTech/Quantity.scss";

function Quantity() {
  const quantity = 1;

  return (
    <div className="quantity-picker">
      <div>
        <div>
          <button
            type="button"
            className="icon-button"
            aria-label="Remove an item"
          >
            <FaMinusCircle />
          </button>
        </div>
        <div className="input-container">
          <input type="text" aria-label="quantity" defaultValue={quantity} />
        </div>
        <div>
          <button
            type="button"
            className="icon-button"
            aria-label="Add an item"
          >
            <FaPlusCircle />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Quantity;
