import { useState, createContext, useContext, useMemo, memo } from 'react'
import { Icon } from '~/Icon'
import { LessonBody, LessonCard } from '~/Lesson'
import classnames from 'classnames'

/****************************************
  FavState.js
*****************************************/

export const FavContext = createContext()

function FavProvider({ children }) {
  const [favorites, setFavorites] = useState([])
  const [misc, setmisc] = useState()

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
      updateFavorite,
      isFavorite,
      favorites,
    }
  }, [favorites])

  return <FavContext.Provider value={context}>{children}</FavContext.Provider>
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

function MainLayout() {
  const { favorites } = useContext(FavContext)
  return (
    <div className="flex justify-between">
      <div>Favorites: {JSON.stringify(favorites)}</div>
      <div>
        <VacationsSubLayout />
      </div>
    </div>
  )
}

/****************************************
  VacationsSubLayout.js
*****************************************/

const VacationsSubLayout = memo(() => {
  console.log('render')
  return <BrowseVacationsPage />
})

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
  const { isFavorite, updateFavorite } = useContext(FavContext)
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
