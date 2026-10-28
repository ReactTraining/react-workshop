import { useEffect } from 'react'
import { Link } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { Tiles } from '~/Tiles'
import { VacationImage } from '~/VacationImage'
import { fetchVacations, selectAllVacations } from './state/vacationsSlice'

function BrowseVacationsPage() {
  const dispatch = useDispatch()
  const vacations = useSelector(selectAllVacations)
  const listStatus = useSelector((state) => state.vacations.listStatus)
  const listError = useSelector((state) => state.vacations.listError)

  // Fetching starts after the component renders. The thunk's `condition`
  // prevents refetching if we already have the list
  useEffect(() => {
    dispatch(fetchVacations())
  }, [dispatch])

  if (listStatus === 'failed') return <div className="text-red-600">{listError}</div>
  if (listStatus !== 'succeeded') return <div>Loading...</div>

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
