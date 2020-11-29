import * as React from "react";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import "YesterTech/Quantity.scss";
import { ReactFCNoChildren } from "YesterTech/types";

interface QuantityProps {
  onChange(value: number): any;
  quantity?: number;
}

const Quantity: ReactFCNoChildren<QuantityProps> = ({
    onChange,
    quantity = 1,
}): React.ReactElement => {
    function subtract() {
        if (quantity > 0) {
            onChange(quantity - 1);
        }
    }

    function add() {
        onChange(quantity + 1);
    }

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const int = parseInt(event.target.value, 10);
        // disallow non-numeric values
        if (!isNaN(int)) {
            onChange(int);
        }
    }

    function handleInputBlur(event: React.FocusEvent<HTMLInputElement>) {
        if (event.target.value.trim() === "") {
            onChange(0);
        }
    }

    function handleInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "ArrowUp") {
            // keep cursor from going back/forth
            event.preventDefault();
            add();
        } else if (event.key === "ArrowDown") {
            // keep cursor from going back/forth
            event.preventDefault();
            subtract();
        }
    }

    return (
        <div className="quantity-picker">
            <div>
                <div>
                    <button type="button" className="icon-button" onClick={subtract}>
                        <FaMinusCircle />
                    </button>
                </div>
                <div className="input-container">
                    <input
                        type="text"
                        aria-label="quantity"
                        value={quantity}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        onKeyDown={handleInputKeyDown} />
                </div>
                <div>
                    <button type="button" className="icon-button" onClick={add}>
                        <FaPlusCircle />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Quantity;
