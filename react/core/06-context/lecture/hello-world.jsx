import { useState, createContext, useContext, useMemo, memo } from 'react'
import { Icon } from '~/Icon'
import { LessonBody, LessonCard } from '~/Lesson'
import classnames from 'classnames'

/****************************************
  App.js
*****************************************/

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

  return (
    <LessonBody>
      <LessonCard>
        <div className="flex justify-between">
          <div>Favorites: {JSON.stringify(favorites)}</div>
          <div>
            <VacationsSubLayout isFavorite={isFavorite} updateFavorite={updateFavorite} />
          </div>
        </div>
      </LessonCard>
    </LessonBody>
  )
}

/****************************************
  VacationsSubLayout.js
*****************************************/

function VacationsSubLayout({ isFavorite, updateFavorite }) {
  return <BrowseVacationsPage isFavorite={isFavorite} updateFavorite={updateFavorite} />
}

/****************************************
  BrowseVacationsPage.js
*****************************************/

function BrowseVacationsPage({ isFavorite, updateFavorite }) {
  return (
    <div className="flex flex-col gap-2">
      <FavoriteVacationButton id={1} isFavorite={isFavorite} updateFavorite={updateFavorite} />
      <FavoriteVacationButton id={2} isFavorite={isFavorite} updateFavorite={updateFavorite} />
      <FavoriteVacationButton id={3} isFavorite={isFavorite} updateFavorite={updateFavorite} />
    </div>
  )
}

/****************************************
  FavoriteVacationButton.js
*****************************************/

function FavoriteVacationButton({ id, isFavorite, updateFavorite }) {
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
