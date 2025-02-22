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
  const vacations = await api.vacations.getAll()
  return { vacations }
}

export function BrowseVacationsPage() {
  const { vacations } = useLoaderData()

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
