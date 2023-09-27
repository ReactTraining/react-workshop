import { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { BrowseVacationsItem } from '~/BrowseVacationsItem'
import { Card } from '~/Card'
import { Tiles } from '~/Tiles'
import { api } from '~/utils/api'
import type { Vacation } from '~/utils/types'

/**
 * 1: Write useEffect
 * 2: Refactor to using a the React Router loader API
 */

// 2. Then refactor the useEffect to use this loader instead
//    Keep this function here while you do #1 first.
export async function loader() {
  return []
}

export function BrowseVacationsPage() {
  // 2: You won't need state for Task 2. Use useLoaderData() instead
  const [vacations, setVacations] = useState<Vacation[] | null>(null)

  // 1. Start by writing a useEffect to fetch data from
  //    this promise-based function
  // api.vacations.getAll().then()

  // Hint: Your dependency array will be empty because this promise
  // does not have any input dependencies

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
