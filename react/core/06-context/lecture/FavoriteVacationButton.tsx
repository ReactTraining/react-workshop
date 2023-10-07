import classnames from 'classnames'
import { Icon } from '~/Icon'
import { useFavoriteContext } from '~/FavoriteContext'

type Props = {
  id: number
  isFavorite(id: number): boolean
  updateFavorite(id: number): void
}

export function FavoriteVacationButton({ id, isFavorite, updateFavorite }: Props) {
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
