import { useLoaderData } from 'react-router-dom'
import { BrowseVacationsItem } from '~/BrowseVacationsItem'
import { Card } from '~/Card'
import { Tiles } from '~/Tiles'
import { api } from '~/utils/api'
import type { Vacation } from '~/utils/types'

// 2: Finished with loader
export async function loader() {
  return api.vacations.getAll()
}

export function BrowseVacationsPage() {
  // 2: Finished with loader
  const vacations = useLoaderData() as Vacation[]

  // 1: With useEffect
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
