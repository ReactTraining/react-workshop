import classnames from 'classnames'
import { useFavoriteContext } from '~/FavoriteContext'
import { Icon } from '~/Icon'
import { useGlobalState } from './index'

type Props = {
  id: number
}

export function FavoriteVacationButton({ id }: Props) {
  // const { updateFavorite, favorites } = useFavoriteContext()
  const { favorites, updateFavorite } = useGlobalState()

  const vacationIsFavorite = favorites.includes(id)

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
