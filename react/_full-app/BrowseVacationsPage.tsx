import { useLoaderData } from 'react-router-dom'
import { Tiles } from '~/Tiles'
import { api } from '~/utils/api'
import { BrowseVacationsItem } from '~/BrowseVacationsItem'
import type { Vacation } from '~/utils/types'

export async function loader({ request }) {
  const searchParams = new URL(request.url).searchParams
  const maxPrice = searchParams.get('maxPrice')
  const dbSearch = new URLSearchParams()
  if (maxPrice) {
    dbSearch.set('price_lte', maxPrice)
  }

  return api.vacations.getAll(dbSearch.toString())
}

export function BrowseVacationsPage() {
  const vacations = useLoaderData() as Vacation[]

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
