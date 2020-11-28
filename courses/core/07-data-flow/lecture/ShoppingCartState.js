import * as React from "react";

const ShoppingCartContext = React.createContext();

export function ShoppingCartProvider({ children }) {
  // paste `cart` state here and utility functions

  return (
    <ShoppingCartContext.Provider value={{}}>
      {children}
    </ShoppingCartContext.Provider>
  );
}

export function useShoppingCart() {
  return React.useContext(ShoppingCartContext);
}
