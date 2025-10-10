import { useState } from 'react'
import { useLoaderData } from 'react-router'
import useSWR from 'swr'
import { BrowseVacationsItem } from '~/BrowseVacationsItem'
import { Tiles } from '~/Tiles'
import { api } from '~/utils/api'
import type { Vacation } from '~/utils/types'

export async function clientLoader() {}

export function BrowseVacationsPage() {
  // 1: State for the useEffect
  const [vacations, setVacations] = useState<Vacation[] | null>(null)

  // 1: You can skip 1 if you would like.
  // Write a useEffect hook to fetch data and keep it in the above state
  api.vacations.getAll().then()

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
