import { useState, createContext, useContext, use, useMemo, memo } from 'react'
import { Icon } from '~/Icon'
import { LessonBody, LessonCard } from '~/Lesson'
import classnames from 'classnames'

/****************************************
  FavProvider
  *****************************************/

const FavContext = createContext()

function FavProvider({ children }) {
  const [favorites, setFavorites] = useState([])

  const context = useMemo(() => {
    function updateFavorite(id) {
      if (isFavorite(id)) {
        setFavorites(favorites.filter((favId) => favId !== id))
      } else {
        setFavorites(favorites.concat(id))
      }
    }

    function isFavorite(id) {
      return favorites.includes(id)
    }
    return {
      favorites,
      updateFavorite,
      isFavorite,
    }
  }, [favorites])

  return <FavContext value={context}>{children}</FavContext>
}

export function useFavContext() {
  const context = use(FavContext)
  if (!context) {
    console.error('Your useFavContext needs to be in a providdr....')
  }
  return context || {}
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

const MainLayout = memo(() => {
  return <BrowseVacationsPage />
})

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
