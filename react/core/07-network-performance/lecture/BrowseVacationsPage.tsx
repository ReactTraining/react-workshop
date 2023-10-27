import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useLoaderData } from 'react-router-dom'
import { Tiles } from '~/Tiles'
import { api } from '~/utils/api'
import { BrowseVacationsItem } from '~/BrowseVacationsItem'
import { queryClient } from '~/utils/queryClient'
import type { Vacation } from '~/utils/types'

// const vacations = await queryClient.ensureQueryData({
//   queryKey: ['vacations'],
//   queryFn: () => api.vacations.getAll(),
//   staleTime: 1000 * 30,
// })

// export async function loader() {
//   return api.vacations.getAll()
// }

export function BrowseVacationsPage() {
  const [vacations, setVacations] = useState<Vacation[] | null>(null)

  useEffect(() => {
    let isCurrent = true
    api.vacations.getAll().then((vacations) => {
      if (isCurrent) setVacations(vacations)
    })
    return () => {
      isCurrent = false
    }
  }, [])

  // const { data: vacations } = useQuery({
  //   queryKey: ['vacations'],
  //   queryFn: () => api.vacations.getAll(),
  //   staleTime: 1000 * 30,
  // })

  return (
    <div>
      {!vacations && <div>Loading...</div>}
      {vacations ? (
        <Tiles minSize={15}>
          {vacations.map((vacation) => {
            return (
              <div key={vacation.id} className="bg-white border">
                <BrowseVacationsItem vacation={vacation} />
              </div>
            )
          })}
        </Tiles>
      ) : null}
    </div>
  )
}
