import { useQuery } from '@tanstack/react-query'
import { useLoaderData } from 'react-router'
import { BrowseVacationsItem } from '~/BrowseVacationsItem'
import { Tiles } from '~/Tiles'
import { api } from '~/utils/api'
import type { Vacation } from '~/utils/types'

// 2: Finished with loader
export async function clientLoader() {
  return api.vacations.getAll()
}

export function BrowseVacationsPage() {
  const { data: vacations } = useQuery({
    queryKey: ['vacations'],
    queryFn: () => api.vacations.getAll(),
    staleTime: 1000 * 30, // 30 seconds
  })

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
