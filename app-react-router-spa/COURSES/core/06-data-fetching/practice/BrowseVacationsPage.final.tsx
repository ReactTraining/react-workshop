import { useLoaderData } from 'react-router'
import useSWR from 'swr'
import { BrowseVacationsItem } from '~/BrowseVacationsItem'
import { Tiles } from '~/Tiles'
import { api } from '~/utils/api'
import type { Vacation } from '~/utils/types'

// 2: Finished with loader
export async function clientLoader() {
  return api.vacations.getAll()
}

export function BrowseVacationsPage() {
  // 2: Finished with loader
  const vacations = useLoaderData() as Vacation[]

  // 1.A: With useEffect
  // const [vacations, setVacations] = useState<Vacation[] | null>(null)
  // useEffect(() => {
  //   let isCurrent = true
  //   api.vacations.getAll().then((vacations) => {
  //     if (isCurrent) {
  //       setVacations(vacations)
  //     }
  //   })
  //   return () => {
  //     isCurrent = false
  //   }
  // }, [])

  // 1.B: With useQuery
  // const { data: vacations } = useSWR('vacations', () => api.vacations.getAll())

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
