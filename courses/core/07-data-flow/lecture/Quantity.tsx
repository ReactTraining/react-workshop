import * as React from "react";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import "YesterTech/Quantity.scss";

function Quantity(): React.ReactElement {
  const [quantity, setQuantity] = React.useState(0);

  function subtract() {
    handleQuantityChange(quantity - 1);
  }

  function add() {
    handleQuantityChange(quantity + 1);
  }

  function handleQuantityChange(val: number) {
    if (val >= 0) {
      setQuantity(val);
      return true;
    }
    return false;
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
            pattern="[0-9]"
            onChange={(event) => {
              const sanitizedValue = event.target.value.replace(/[^0-9]/g, "");
              const newVal = parseInt(sanitizedValue);
              handleQuantityChange(isNaN(newVal) ? 0 : newVal);
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
  );
}

export default Quantity;
