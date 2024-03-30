import { useState, createContext, useContext, useMemo, memo } from 'react'
import { Icon } from '~/Icon'
import { LessonBody, LessonCard } from '~/Lesson'
import classnames from 'classnames'

/****************************************
  FavContext
*****************************************/

const FavContext = createContext()

export function FavProvider({ children }) {
  const [favorites, setFavorites] = useState([])

  const context = useMemo(() => {
    const isFavorite = (id) => {
      return favorites.includes(id)
    }
    return {
      isFavorite,
      updateFavorite: (id) => {
        if (isFavorite(id)) {
          setFavorites(favorites.filter((favId) => favId !== id))
        } else {
          setFavorites(favorites.concat(id))
        }
      },
      favorites,
    }
  }, [favorites])

  return <FavContext.Provider value={context}>{children}</FavContext.Provider>
}

export function useFavContext() {
  const context = useContext(FavContext)
  if (!context) {
    console.warn('You are trying to consume context without a provider')
  }
  return context || {}
}

/****************************************
  App.js
*****************************************/

export function App() {
  return (
    <LessonBody>
      <LessonCard>
        <FavProvider>
          <MainLayout />
        </FavProvider>
      </LessonCard>
    </LessonBody>
  )
}

/****************************************
  MainLayout.js
*****************************************/

function MainLayout() {
  const { favorites } = useFavContext()
  return (
    <div className="flex justify-between">
      <div>Favorites: {JSON.stringify(favorites)}</div>
      <div>
        <BrowseVacationsPage />
      </div>
    </div>
  )
}

/****************************************
  BrowseVacationsPage.js
*****************************************/

function BrowseVacationsPage() {
  return (
    <div className="flex flex-col gap-2">
      <FavoriteVacationButton id={1} />
      <FavoriteVacationButton id={2} />
      <FavoriteVacationButton id={3} />
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
