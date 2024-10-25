import { useState } from 'react'
import { VacationImage } from '~/VacationImage'
import { api } from '~/utils/api'

export function App() {
  const [vacations, setVacations] = useState([])
  const [pending, setPending] = useState(false)

  function loadVacations() {
    setPending(true)

    api.vacations.getAll().then((vacations) => {
      setPending(false)
      setVacations(vacations)
    })

    console.log('here')
  }

  return (
    <div className="space-y-6 min-w-96">
      <button className="button block" onClick={loadVacations}>
        Load Vacations
      </button>
      {pending && <div>Loading...</div>}
      {!pending &&
        vacations.length > 0 &&
        vacations.map((vacation) => {
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
    </div>
  )
}
