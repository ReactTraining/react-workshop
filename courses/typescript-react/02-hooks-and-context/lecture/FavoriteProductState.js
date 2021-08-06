import * as React from 'react'
import * as storage from 'YesterTech/localStorage'

const FavoriteProductContext = React.createContext()

export const FavoriteProductProvider = ({ children }) => {
  const [favorites, setFavorites] = React.useState(() => {
    return storage.getFavorites()
  })

  const firstRenderRef = React.useRef(true)

  React.useEffect(() => {
    if (!firstRenderRef.current) {
      storage.updateFavorites(favorites)
    }
    firstRenderRef.current = false
  }, [favorites])

  const value = {
    isFavorite(productId) {
      return favorites.includes(productId)
    },
    addFavorite(productId) {
      setFavorites((favorites) => favorites.concat(productId))
    },
    removeFavorite(productId) {
      setFavorites((favorites) => favorites.filter((id) => id !== productId))
    },
  }

  return <FavoriteProductContext.Provider value={value} children={children} />
}

export function useFavoriteProduct() {
  return React.useContext(FavoriteProductContext)
}
