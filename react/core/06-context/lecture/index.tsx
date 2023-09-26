import { useState, createContext } from 'react'
import * as ReactDOM from 'react-dom/client'
import { LessonBody, LessonCard } from '~/Lesson'
import { BrowseVacationsPage } from './BrowseVacationsPage'
import { Icon } from '~/Icon'

function App() {
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

  return (
    <LessonBody>
      <LessonCard>
        <div className="flex gap-6">
          <aside className="w-60 pr-6 border-r border-slate-300 space-y-6">
            <div className="text-2xl">
              <span className="text-yellow-500">
                <Icon name="star" />
              </span>
              <span className="align-middle ml-2">Favorites: {favorites.length}</span>
            </div>
          </aside>
          <main className="flex-1 min-h-[400px]">
            <BrowseVacationsPage updateFavorite={updateFavorite} isFavorite={isFavorite} />
          </main>
        </div>
      </LessonCard>
    </LessonBody>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
