import { useQueries } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { api } from '~/utils/api'
import { Tiles } from '~/Tiles'
import { VacationImage } from '~/VacationImage'
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
    <Tiles minSize={7}>
      {vacations.map((vacation) => {
        return (
          <Link key={vacation.id} to={`/vacations/${vacation.id}`} className="relative group">
            <span className="bg-slate-800 text-white text-xs absolute top-0 right-0 py-1 px-2 hidden group-hover:block">
              {vacation.id}
            </span>
            <VacationImage
              vacationId={vacation.id}
              alt={vacation.name}
              className="block object-cover h-20"
            />
            <b className="block text-sm text-textColor">{vacation.name}</b>
          </Link>
        )
      })}
    </Tiles>
  )
}
