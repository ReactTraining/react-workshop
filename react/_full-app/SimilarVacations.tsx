import { useQueries } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { api } from '~/utils/api'
import { Tiles } from '~/Tiles'
import { VacationImage } from '~/BrowseVacationsPage'
import type { Vacation } from '~/utils/types'

type Props = {
  vacationIds: number[]
}

export function SimilarVacations({ vacationIds: ids }: Props) {
  const vacations = useQueries({
    queries: ids.map((id) => {
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
    <Tiles minSize={6}>
      {vacations.map((vacation) => {
        return (
          <Link key={vacation.id} to={`/vacations/${vacation.id}`}>
            <VacationImage
              vacationId={vacation.id}
              alt={vacation.name}
              className="block object-cover h-20 aspect-square"
            />
            <b className="block text-sm text-textColor">{vacation.name}</b>
          </Link>
        )
      })}
    </Tiles>
  )
}
