import { useState, createContext, use, useMemo, memo, useContext } from 'react'
import { Icon } from '~/Icon'
import { LessonBody, LessonCard } from '~/Lesson'
import classnames from 'classnames'

/****************************************
  App.js
*****************************************/

export const FavContext = createContext()

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
    <FavContext.Provider value={context}>
      <LessonBody>
        <LessonCard>
          <MainLayout />
        </LessonCard>
      </LessonBody>
    </FavContext.Provider>
  )
}

/****************************************
  MainLayout.js
*****************************************/

const MainLayout = memo(() => {
  console.log('render')
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
  const { updateFavorite, isFavorite } = useContext(FavContext)

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
