import { createContext, useContext, useEffect, useLayoutEffect, useState } from 'react'

type Context = {
  favorites: number[]
  add(id: number): void
  remove(id: number): void
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
    let favorites = JSON.parse(window.localStorage.getItem(LOCAL_KEY) || '[]')

    // Always start off with tree favorites
    if (favorites.length === 0) {
      favorites = favorites.concat([1, 2, 3])
    }

    setFavorites(favorites)
  }, [])

  const add = (id: number) => {
    if (!favorites.includes(id)) {
      setFavorites([id, ...favorites])
    }
  }

  const remove = (id: number) => {
    setFavorites(favorites.filter((favoriteId) => favoriteId !== id))
  }

  const context: Context = {
    favorites,
    add,
    remove,
    isFavorite: (id: number) => favorites.includes(id),
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
