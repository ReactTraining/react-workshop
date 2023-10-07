import { createContext, useContext, useState, useMemo, memo } from 'react'

// type Context = {
//   favorites: number[]
//   updateFavorite(id: number): void
//   isFavorite(id: number): boolean
// }

const FavoriteContext = createContext()

export function FavoriteProvider({ children }: any) {
  const [favorites, setFavorites] = useState<number[]>([])

  function updateFavorite(id: number) {
    if (isFavorite(id)) {
      setFavorites(favorites.filter((favId) => favId !== id))
    } else {
      setFavorites(favorites.concat(id))
    }
  }

  function isFavorite(id: number) {
    return favorites.includes(id)
  }

  const context = {
    favorites,
    updateFavorite,
    isFavorite,
  }

  return <FavoriteContext.Provider value={context}>{children}</FavoriteContext.Provider>
}

export function useFavoriteContext() {
  const context = useContext(FavoriteContext)
  if (!context) {
    throw Error('useFavoriteContext() is being called outside of the correct provider')
  }
  return context || {}
}
