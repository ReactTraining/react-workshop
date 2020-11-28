import * as React from "react";
import Heading from "YesterTech/Heading";
import { CartProduct } from "YesterTech/types";

interface CheckoutProps {
  cart: CartProduct[];
}

function Checkout({ cart = [] }: CheckoutProps) {
  return (
    <div>
      <Heading>Cart Review</Heading>
      {Array.isArray(cart) && cart.length > 0 ? (
        <ul>
          {cart.map((item) => (
            <li key={item.productId}>
              {item.name}: {item.price.toFixed(2)}
            </li>
          ))}
        </ul>
      ) : (
        <div>Cart is empty.</div>
      )}
    </div>
  );
}

export default Checkout;
