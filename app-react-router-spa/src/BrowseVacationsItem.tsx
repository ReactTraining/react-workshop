import { Link } from 'react-router'
import classnames from 'classnames'
import { VacationImage } from '~/VacationImage'
import { Icon } from '~/Icon'
import { useFavoriteContext } from '~/FavoriteContext'
import type { Vacation } from '~/utils/types'

type Props = {
  vacation: Vacation
}

export function BrowseVacationsItem({ vacation }: Props) {
  const { favorites, updateFavorite } = useFavoriteContext()
  const vacationIsFavorite = favorites.includes(vacation.id)
  return (
    <div className="p-3 overflow-hidden flex flex-col">
      <div className="h-52 -m-3 flex">
        <VacationImage
          vacationId={vacation.id}
          alt={vacation.name}
          className="block object-cover flex-1"
        />
      </div>
      <div className="space-y-3 mt-3 border-t">
        <div className="mt-3 flex justify-between items-center">
          <div className="">{vacation.name}</div>
          <b className="block">${vacation.price}</b>
        </div>
        <div className="flex gap-2">
          <div className="w-full flex gap-2">
            <Link to={`/vacations/${vacation.id}`} className="button flex-1">
              View
            </Link>
            <button
              className="button"
              onClick={() => {
                updateFavorite(vacation.id)
              }}
            >
              <span className={classnames({ 'text-yellow-500': vacationIsFavorite })}>
                <Icon name="star" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
