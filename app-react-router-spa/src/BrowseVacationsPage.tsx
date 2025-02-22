import { Tiles } from '~/Tiles'
import { api } from '~/utils/api'
import { BrowseVacationsItem } from '~/BrowseVacationsItem'
import { queryClient } from './utils/queryClient'
import { useLoaderData } from 'react-router'

export async function loader() {
  const vacations = await queryClient.fetchQuery({
    queryKey: ['vacations'],
    queryFn: () => api.vacations.getAll(),
    staleTime: 1000 * 30,
  })
  return vacations
}

type LoaderData = Awaited<ReturnType<typeof loader>>

export function BrowseVacationsPage() {
  const vacations = useLoaderData() as LoaderData

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
