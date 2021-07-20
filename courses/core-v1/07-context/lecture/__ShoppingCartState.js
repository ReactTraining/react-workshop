import * as React from 'react'

const ShoppingCartContext = React.createContext({})

export const ShoppingCartProvider = ({ children }) => (
  // paste `cart` state here and utility functions
  <ShoppingCartContext.Provider value={{}}>{children}</ShoppingCartContext.Provider>
)

export function useShoppingCart() {
  return React.useContext(ShoppingCartContext)
}
