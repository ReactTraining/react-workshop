import { useEffect, useState } from 'react'
import { Tiles } from '~/Tiles'
import { api } from '~/utils/api'
import { BrowseVacationsItem } from '~/BrowseVacationsItem'
import type { Vacation } from '~/utils/types'

export default function BrowseVacationsPage() {
  const [vacations, setVacations] = useState<Vacation[] | null>(null)

  useEffect(() => {
    let isCurrent = true
    api.vacations.getAll().then((vacations) => {
      if (isCurrent) setVacations(vacations)
    })
    return () => {
      isCurrent = false
    }
  }, [])

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
