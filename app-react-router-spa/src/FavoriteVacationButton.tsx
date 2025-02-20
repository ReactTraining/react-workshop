import classnames from 'classnames'
import { useFavoriteContext } from '~/FavoriteContext'
import { Icon } from '~/Icon'

type Props = {
  id: number
}

export function FavoriteVacationButton({ id }: Props) {
  const { updateFavorite, isFavorite } = useFavoriteContext()
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
