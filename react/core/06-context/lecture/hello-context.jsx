import React, { useState, createContext, useContext, useMemo, memo } from 'react'
import { Icon } from '~/Icon'
import { LessonBody, LessonCard } from '~/Lesson'
import classnames from 'classnames'

/****************************************
  App.js
*****************************************/

const FavContext = React.createContext()
const AuthContext = React.createContext()

export function App() {
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

  return (
    <LessonBody>
      <LessonCard>
        <AuthContext.Provider>
          <FavContext.Provider value={context}>
            <MainLayout />
          </FavContext.Provider>
        </AuthContext.Provider>
      </LessonCard>
    </LessonBody>
  )
}

/****************************************
  MainLayout.js
*****************************************/

function MainLayout() {
  const { favorites } = useContext(FavContext)
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

function FavoriteVacationButton() {
  const { id, isFavorite, updateFavorite } = useContext(FavContext)
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
