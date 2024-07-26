import { useState } from 'react'
import { VacationImage } from '~/VacationImage'
import { api } from '~/utils/api'

// Note that this is a JSX and not a TSX file
// So you're doing JavaScript not TypeScript

export function App() {
  const [vacations, setVacations] = useState([])

  function loadVacations() {
    api.vacations.getAll().then((vacations) => {
      console.log(vacations) // setVacations()
    })
  }

  return (
    <div className="space-y-6 min-w-96">
      <button className="button block" onClick={loadVacations}>
        Load Vacations
      </button>
      {/* Start Map */}

      {vacations.map((vacation) => {
        return (
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
        )
      })}

      {/* End Map */}
    </div>
  )
}
