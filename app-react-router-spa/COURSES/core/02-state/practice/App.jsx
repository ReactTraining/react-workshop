import { useState } from 'react'
import { VacationImage } from '~/VacationImage'
import { api } from '~/utils/api'

// Note that this is a JSX and not a TSX file
// So you're doing JavaScript not TypeScript

export function App() {
  const [vacations, setVacations] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  function loadVacations() {
    setIsLoading(true)
    setError(null)

    api.vacations
      .getAll()
      .then((vacations) => {
        setVacations(vacations)
      })
      .catch((err) => {
        setError('Failed to load vacations. Please try again.')
        console.error('Error loading vacations:', err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <div className="space-y-6 min-w-96">
      <button className="button block" onClick={loadVacations} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Load Vacations'}
      </button>

      {error && <div className="text-red-500">{error}</div>}

      {vacations.map((vacation) => (
        <div key={vacation.id} className="p-3 overflow-hidden flex flex-col max-w-96">
          <div className="h-52 -m-3 flex">
            <VacationImage
              vacationId={vacation.id}
              alt={vacation.name}
              className="block object-cover flex-1"
            />
          </div>
          <div className="space-y-3 mt-3 border-t">
            <div className="mt-3 flex justify-between items-center">
              <div className="">{vacation.name}</div>
              <b className="block">${vacation.price}</b>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
