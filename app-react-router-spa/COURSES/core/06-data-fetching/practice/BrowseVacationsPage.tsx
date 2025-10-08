import { useState } from 'react'
import { useLoaderData } from 'react-router'
import useSWR from 'swr'
import { BrowseVacationsItem } from '~/BrowseVacationsItem'
import { Tiles } from '~/Tiles'
import { api } from '~/utils/api'
import type { Vacation } from '~/utils/types'

export function BrowseVacationsPage() {
  // 1: State for the useEffect
  const [vacations, setVacations] = useState<Vacation[] | null>(null)

  // 1: You can skip 1 if you would like.
  // Write a useEffect hook to fetch data and keep it in the above state
  // api.vacations.getAll().then()

  // 2: You can skip 1 but you should try to do 2. Use useSWR to fetch data
  // (you won't need useState)

  // const { data } = useSWR('key', () => {})

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
