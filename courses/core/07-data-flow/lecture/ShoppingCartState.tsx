import * as React from "react";
import { CartProduct } from "YesterTech/types";

const ShoppingCartContext = React.createContext({} as ShoppingCartContextValue);

export const ShoppingCartProvider: React.FC = function ShoppingCartProvider({
  children,
}) {
  // paste `cart` state here and utility functions

  return (
    <ShoppingCartContext.Provider value={{} as any}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

export function useShoppingCart() {
  return React.useContext(ShoppingCartContext);
}

interface ShoppingCartContextValue {
  addToCart(
    productId: CartProduct["productId"],
    name: CartProduct["name"],
    price: CartProduct["price"]
  ): void;
  updateQuantity(
    productId: CartProduct["productId"],
    quantity: CartProduct["quantity"]
  ): void;
  removeFromCart(productId: CartProduct["productId"]): void;
  getQuantity(productId: CartProduct["productId"]): number;
  getCartSize(): number;
  getCartTotal(): number;
  cart: CartProduct[];
}
