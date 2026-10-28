import { Link, useLoaderData } from 'react-router'
import { Tiles } from '~/Tiles'
import { VacationImage } from '~/VacationImage'
import { queryClient } from './queryClient'
import { vacationsQuery } from './vacationQueries'

// Fetching starts as soon as the user navigates, before this component renders.
// ensureQueryData returns cached data if we already have it
export function loader() {
  return queryClient.ensureQueryData(vacationsQuery())
}

function BrowseVacationsPage() {
  const vacations = useLoaderData()

  return (
    <Tiles minSize={15}>
      {vacations.map((vacation) => (
        <div key={vacation.id} className="bg-white border">
          <div className="h-52 flex">
            <VacationImage
              vacationId={vacation.id}
              alt={vacation.name}
              className="block object-cover flex-1"
            />
          </div>
          <div className="p-3 space-y-3">
            <div className="flex justify-between items-center">
              <div>{vacation.name}</div>
              <b>${vacation.price}</b>
            </div>
            <div className="flex">
              <Link to={`/vacations/${vacation.id}`} className="button flex-1">
                View
              </Link>
            </div>
          </div>
        </div>
      ))}
    </Tiles>
  )
}

export default BrowseVacationsPage
