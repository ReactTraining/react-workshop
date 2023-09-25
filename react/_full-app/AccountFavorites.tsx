import { useQueries } from '@tanstack/react-query'
import { Icon } from '~/Icon'
import { useFavoriteContext } from '~/FavoriteContext'
import { api } from '~/utils/api'
import type { Vacation } from '~/utils/types'

export function AccountFavorites() {
  const { favorites, remove } = useFavoriteContext()

  const vacations = useQueries({
    queries: favorites.map((id) => {
      return {
        queryKey: ['vacation', id],
        queryFn: () => api.vacations.getVacation(id),
        staleTime: 1000 * 30, // 30s
      }
    }),
  })
    .filter((results) => results.isSuccess)
    .map((results) => results.data) as Vacation[]

  return (
    <div className="space-y-3">
      {vacations.length === 0 && <div className="border rounded-lg px-4 py-6">None Added</div>}
      {vacations.length > 0 &&
        vacations.map((vacation) => {
          return (
            <AccountFavoriteItem
              key={vacation.id}
              id={vacation.id}
              name={vacation.name}
              onRemove={remove}
            />
          )
        })}
    </div>
  )
}

type Props = {
  id: number
  name: string
  onRemove(id: number): void
}

export function AccountFavoriteItem({ id, name, onRemove }: Props) {
  return (
    <div className="flex items-center gap-2 bg-slate-100 p-2">
      <span className="text-yellow-500">
        <Icon name="star" />
      </span>
      <span className="flex-1">{name}</span>
      <button
        aria-label="Remove Favorite"
        className="text-brandBlue hover:text-brandBlueDark"
        onClick={() => onRemove(id)}
      >
        <Icon name="xCircle" />
      </button>
    </div>
  )
}
