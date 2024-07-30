import { useState, createContext, use, useMemo, memo, useContext } from 'react'
import { Icon } from '~/Icon'
import { LessonBody, LessonCard } from '~/Lesson'
import classnames from 'classnames'

/****************************************
  FavState.tsx
*****************************************/

type ContextType = {
  favorites: number[]
  updateFavorite(id: number): void
  isFavorite(id: number): void
}

export const FavContext = createContext<ContextType>(null!)

type Props = {
  children: React.ReactNode
}

function FavProvider({ children }: Props) {
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

  const context: ContextType = {
    favorites,
    updateFavorite,
    isFavorite,
  }

  return <FavContext.Provider value={context}>{children}</FavContext.Provider>
}

function useFavContext() {
  const context = useContext(FavContext)
  if (!context) {
    console.warn("you're trying to consume FavContext without being in the provider")
  }
  return context
}

/****************************************
  App.js
*****************************************/

export function App() {
  return (
    <FavProvider>
      <LessonBody>
        <LessonCard>
          <MainLayout />
        </LessonCard>
      </LessonBody>
    </FavProvider>
  )
}

/****************************************
  MainLayout.js
*****************************************/

function MainLayout() {
  return <BrowseVacationsPage />
}

/****************************************
 BrowseVacationsPage.js
 *****************************************/

function BrowseVacationsPage() {
  const { favorites } = useContext(FavContext)

  return (
    <div className="flex justify-between">
      <div>Favorites: {JSON.stringify(favorites)}</div>
      <div>
        <div className="flex flex-col gap-2">
          <FavoriteVacationButton id={1} />
          <FavoriteVacationButton id={2} />
          <FavoriteVacationButton id={3} />
        </div>
      </div>
    </div>
  )
}

/****************************************
  FavoriteVacationButton.js
*****************************************/

function FavoriteVacationButton({ id }) {
  const { isFavorite, updateFavorite } = useFavContext()

  const vacationIsFavorite = isFavorite(id)

  return (
    <button
      className={classnames(`button button-outline`, {
        '!text-yellow-500': vacationIsFavorite,
      })}
      onClick={() => updateFavorite(id)}
    >
      {vacationIsFavorite ? <Icon name="star" /> : <Icon name="starOutline" />}
      <span>Favorite</span>
    </button>
  )
}
