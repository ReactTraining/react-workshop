import { useState, createContext, useContext, memo, useMemo } from 'react'
import * as ReactDOM from 'react-dom/client'
import { LessonBody, LessonCard } from '~/Lesson'
import { BrowseVacationsPage } from './BrowseVacationsPage'
import { Icon } from '~/Icon'

/////// FavoritesContext.tsx

type Context = {
  favorites: number[]
  updateFavorite(id: number): void
  isFavorite(id: number): void
}

export const FavoritesContext = createContext<Context>(null!)

type Props = {
  children: React.ReactNode
}

function FavoritesProvider({ children }: Props) {
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

  const context: Context = {
    updateFavorite,
    isFavorite,
    favorites,
  }

  return <FavoritesContext.Provider value={context}>{children}</FavoritesContext.Provider>
}

export function useFavoritesContext() {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw Error('Youre using context without a provider')
  }
  return context || {}
}

/////// App

function App() {
  return (
    <FavoritesProvider>
      <LessonBody>
        <LessonCard>
          <div className="flex gap-6">
            <Custom />
            <main className="flex-1 min-h-[400px]">
              <BrowseVacationsPage />
            </main>
          </div>
        </LessonCard>
      </LessonBody>
    </FavoritesProvider>
  )
}

const Custom = memo(() => {
  console.log('render custom')
  return <Aside />
})

///// one file

function Aside() {
  const { favorites } = useFavoritesContext()

  return (
    <aside className="w-60 pr-6 border-r border-slate-300 space-y-6">
      <div className="text-2xl">
        <span className="text-yellow-500">
          <Icon name="star" />
        </span>
        <span className="align-middle ml-2">Favorites: {favorites.length}</span>
      </div>
    </aside>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
