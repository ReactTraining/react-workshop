import { useState, createContext, use, useMemo, memo, useContext } from 'react'
import { Icon } from '~/Icon'
import { LessonBody, LessonCard } from '~/Lesson'
import classnames from 'classnames'

/****************************************
  FavContext.js
*****************************************/

const Context = createContext()

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

  return <Context value={context}>{children}</Context>
}

export function useFavoriteContext() {
  const context = use(Context)
  if (!context) {
    throw Error('Use of `useFavoriteContext` is outside of `FavProvider`')
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
        <AuthProvider>
          <FavProvider>
            <MainLayout />
          </FavProvider>
        </AuthProvider>
      </LessonCard>
    </LessonBody>
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
  const { favorites } = use(FavContext)
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
  const { isFavorite, updateFavorite } = useFavoriteContext()
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
