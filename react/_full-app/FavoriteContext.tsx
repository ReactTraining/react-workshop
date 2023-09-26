import { createContext, useContext, useEffect, useLayoutEffect, useState } from 'react'

type Context = {
  favorites: number[]
  updateFavorite(id: number): void
  isFavorite(id: number): boolean
}

const FavoriteContext = createContext<Context>(null!)
const LOCAL_KEY = 'reacttraining-workshop-favorites'

type Props = {
  children: React.ReactNode
}

export function FavoriteProvider({ children }: Props) {
  const [favorites, setFavorites] = useState<number[]>([])

  useEffect(() => {
    window.localStorage.setItem(LOCAL_KEY, JSON.stringify(favorites))
  }, [favorites])

  // When the page first loads
  useLayoutEffect(() => {
    const favorites = JSON.parse(window.localStorage.getItem(LOCAL_KEY) || '[]')
    setFavorites(favorites)
  }, [])

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

  const context: Context = {
    favorites,
    updateFavorite,
    isFavorite,
  }

  return <FavoriteContext.Provider value={context} children={children} />
}

export function useFavoriteContext() {
  const context = useContext(FavoriteContext)
  if (!context) {
    throw Error('Use of `useFavoriteContext` is outside of `FavoriteProvider`')
  }
  return context || {}
}
