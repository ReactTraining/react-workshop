import * as React from 'react'
import * as storage from 'YesterTech/localStorage'

const FavoriteProductContext = React.createContext<FavoriteProductContextValue>({
  isFavorite() {
    return false
  },
  addFavorite() {},
  removeFavorite() {},
})

export const FavoriteProductProvider: React.FC = ({ children }): React.ReactElement => {
  const [favorites, setFavorites] = React.useState<number[]>(() => {
    return storage.getFavorites()
  })

  const firstRenderRef = React.useRef(true)

  React.useEffect(() => {
    if (!firstRenderRef.current) {
      storage.updateFavorites(favorites)
    }
    firstRenderRef.current = false
  }, [favorites])

  const context: FavoriteProductContextValue = {
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

  return <FavoriteProductContext.Provider value={context} children={children} />
}

export function useFavoriteProduct() {
  return React.useContext(FavoriteProductContext)
}

interface FavoriteProductContextValue {
  isFavorite(productId: number): boolean
  addFavorite(productId: number): void
  removeFavorite(productId: number): void
}
