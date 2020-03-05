import React, { useContext, useState } from 'react'

const ShoppingCartContext = React.createContext()

export function ShoppingCartProvider({ children }) {
  // paste `cart` state here and utility functions

  return (
    <ShoppingCartContext.Provider value={{}} children={children} />
  )
}

export function useShoppingCart() {
  return useContext(ShoppingCartContext)
}
