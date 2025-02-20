import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useLoaderData } from 'react-router'
import { BrowseVacationsItem } from '~/BrowseVacationsItem'
import { Tiles } from '~/Tiles'
import { api } from '~/utils/api'
import type { Vacation } from '~/utils/types'

// 2. Then refactor the code that was fetching within the component to fetch
//    from this loader instead. Note that React Router is already importing this
//    loading and attaching it to the correct route
export async function loader() {
  return []
}

export function BrowseVacationsPage() {
  // 1.A: State for the useEffect
  const [vacations, setVacations] = useState<Vacation[] | null>(null)

  // 1.A: You can skip 1.A if you would like.
  // Write a useEffect hook to fetch data and keep it in the above state
  // api.vacations.getAll().then()

  // 1.B: You can skip 1.A but you should try to do 1.B. Use "Tanstack Query" also known
  // as React Query, to fetch data instead of useEffect and storing your own state
  // (you won't need useState)

  // const { data } = useQuery({
  //   queryKey: // an array with "keys" to cache the data
  //   queryFn: // a function which returns a promise and the promise resolves your data
  //   staleTime: // milliseconds for how long this data will remain in cache
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
