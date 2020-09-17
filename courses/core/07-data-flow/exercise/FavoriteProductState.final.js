import React, { useContext, useState, useEffect, useRef } from 'react'
import * as storage from 'YesterTech/localStorage'

const FavoriteProductContext = React.createContext()

export function FavoriteProductProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    return storage.getFavorites() || []
  })

  const firstRenderRef = useRef(true)

  useEffect(() => {
    if (!firstRenderRef.current) {
      storage.updateFavorites(favorites)
    }
    firstRenderRef.current = false
  }, [favorites])

  const context = {
    isFavorite: productId => favorites.includes(productId),
    addFavorite: productId => {
      setFavorites(favorites.concat(productId))
    },
    removeFavorite: productId => {
      setFavorites(favorites.filter(id => id !== productId))
    }
  }

  return <FavoriteProductContext.Provider value={context} children={children} />
}

export function useFavoriteProduct() {
  return useContext(FavoriteProductContext)
}
