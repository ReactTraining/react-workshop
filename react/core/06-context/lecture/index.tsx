import { useState, createContext, useContext, memo, useMemo } from 'react'
import * as ReactDOM from 'react-dom/client'
import { LessonBody, LessonCard } from '~/Lesson'
import { BrowseVacationsPage } from './BrowseVacationsPage'
import { Icon } from '~/Icon'

type ContextType = {
  favorites: number[]
  updateFavorite(id: number): void
  isFavorite(id: number): boolean
}

export const FavoritesContext = createContext<ContextType>(null!)

function App() {
  const [favorites, setFavorites] = useState<number[]>([])
  const [misc, setMisc] = useState({})

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

  const context = useMemo(() => {
    return {
      favorites,
      updateFavorite,
      isFavorite,
    }

    // We don't want those fns in here because.......
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favorites])

  return (
    <FavoritesContext.Provider value={context}>
      <LessonBody>
        <LessonCard>
          <div className="flex gap-6">
            <Aside />
            <main className="flex-1 min-h-[400px]">
              <BrowseVacationsPage />
            </main>
          </div>
        </LessonCard>
      </LessonBody>
    </FavoritesContext.Provider>
  )
}

const Aside = memo(() => {
  return (
    <aside className="w-60 pr-6 border-r border-slate-300 space-y-6">
      <div className="text-2xl">
        <span className="text-yellow-500">
          <Icon name="star" />
        </span>
        <ShowFavoritesNumber />
      </div>
    </aside>
  )
})

function ShowFavoritesNumber() {
  const { favorites } = useContext(FavoritesContext)

  return <span className="align-middle ml-2">Favorites: {favorites.length}</span>
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
