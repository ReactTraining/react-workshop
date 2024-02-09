import { useState, createContext, useContext, useMemo, memo } from 'react'
import { Icon } from '~/Icon'
import { LessonBody, LessonCard } from '~/Lesson'
import classnames from 'classnames'

/****************************************
  FavContext.tsx
*****************************************/

const FavContext = createContext()

function FavProvider({ children }) {
  const [favorites, setFavorites] = useState([])

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

  const context = {
    favorites,
    updateFavorite,
    isFavorite,
  }

  return <FavContext.Provider value={context}>{children}</FavContext.Provider>
}

export function useFavContext() {
  const context = useContext(FavContext)
  if (!context) {
    throw Error('You are trying to consume FavContext but there is no provider....')
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
  return (
    <div className="flex justify-between">
      <div>
        <BrowseVacationsPage />
      </div>
    </div>
  )
}

/****************************************
 BrowseVacationsPage.js
 *****************************************/

const BrowseVacationsPage = memo(() => {
  const { favorites } = useContext(FavContext)

  return (
    <>
      <div>Favorites: {JSON.stringify(favorites)}</div>
      <div className="flex flex-col gap-2">
        <FavoriteVacationButton id={1} />
        <FavoriteVacationButton id={2} />
        <FavoriteVacationButton id={3} />
      </div>
    </>
  )
})

/****************************************
  FavoriteVacationButton.js
*****************************************/

function FavoriteVacationButton({ id }) {
  const { isFavorite, updateFavorite } = useFavContext() // useContext

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
