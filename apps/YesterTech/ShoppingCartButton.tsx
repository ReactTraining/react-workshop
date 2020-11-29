import * as React from "react";
import { Link } from "react-router-dom";
import { MdShoppingCart } from "react-icons/md";
import { ReactFCNoChildren } from "YesterTech/types";

interface ShoppingCartButtonProps {
  quantity: number;
  onClick?(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
}

const ShoppingCartButton: ReactFCNoChildren<ShoppingCartButtonProps> = ({
  quantity,
  onClick,
}): React.ReactElement =>
  quantity > 0 ? (
    <Link to="/checkout" className="button cta-button">
      <MdShoppingCart />
      <span>Checkout</span>
    </Link>
  ) : (
    <button className="button" onClick={onClick}>
      Add To Cart
    </button>
  );

export default ShoppingCartButton;
