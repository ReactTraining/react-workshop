import * as React from "react";
import { Link } from "react-router-dom";
import { MdShoppingCart } from "react-icons/md";
import { ReactComponentWithoutChildren } from "YesterTech/types";

interface ShoppingCartButtonProps {
  quantity: number;
  onClick?(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
}

const ShoppingCartButton: ReactComponentWithoutChildren<ShoppingCartButtonProps> = function ShoppingCartButton({
  quantity,
  onClick,
}): React.ReactElement {
  return quantity > 0 ? (
    <Link to="/checkout" className="button cta-button">
      <MdShoppingCart />
      <span>Checkout</span>
    </Link>
  ) : (
    <button className="button" onClick={onClick}>
      Add To Cart
    </button>
  );
};

export default ShoppingCartButton;
