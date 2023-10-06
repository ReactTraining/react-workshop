import { createContext, useContext, useState } from 'react'

// type Context = {
//   favorites: number[]
//   updateFavorite(id: number): void
//   isFavorite(id: number): boolean
// }

const FavoriteContext = createContext<any>(null)

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

// function useFavoriteContext() {
// }
