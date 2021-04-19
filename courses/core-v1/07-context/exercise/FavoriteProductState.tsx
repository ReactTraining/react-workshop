/* eslint-disable no-unused-vars */
import * as React from 'react'
import * as storage from 'YesterTech/localStorage'

// Make your context here

export const FavoriteProductProvider: React.FC = ({ children }) => {
  return (
    // Wrap children in the provider instead of the Fragment
    <React.Fragment>{children}</React.Fragment>
  )
}

export function useFavoriteProduct() {
  // return the return-value of useContext
}

interface FavoriteProductContextValue {
  isFavorite(productId: number): boolean
  addFavorite(productId: number): void
  removeFavorite(productId: number): void
}
