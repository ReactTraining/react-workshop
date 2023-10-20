import { useState, createContext, useContext, useMemo, memo } from 'react'
import { Icon } from '~/Icon'
import { LessonBody, LessonCard } from '~/Lesson'
import classnames from 'classnames'

/****************************************
  FavContext.tsx
*****************************************/

const FavoritesContext = createContext()

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([])

  const context = useMemo(() => {
    const isFavorite = (id) => {
      return favorites.includes(id)
    }
    return {
      updateFavorite: (id) => {
        if (isFavorite(id)) {
          setFavorites(favorites.filter((favId) => favId !== id))
        } else {
          setFavorites(favorites.concat(id))
        }
      },
      isFavorite,
    }
  }, [favorites])

  return <FavoritesContext.Provider value={context} children={children} />
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) {
    // throw new Error()
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
        <FavoritesProvider>
          <div className="flex justify-between">
            <div>Favorites: }</div>
            <div>
              <VacationsSubLayout />
            </div>
          </div>
        </FavoritesProvider>
      </LessonCard>
    </LessonBody>
  )
}

/****************************************
  VacationsSubLayout.js
*****************************************/

const VacationsSubLayout = memo(() => {
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
  const { isFavorite, updateFavorite } = useFavorites()
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
