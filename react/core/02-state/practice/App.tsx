import { useState } from 'react'
import { VacationImage } from '~/VacationImage'
import { api } from '~/utils/api'
import type { Vacation } from '~/utils/types'

// Your state's "type" will be Vacation[] which means an array of
// Vacation objects Keep in mind your state can start of with
// any initial value, but we recommend this which means your initial
// state will be an array and your state type is either and empty array
// or an array of Vacations
// useState<Vacation[]>([])

export function App() {
  // const [state, setState] = useState(/* initialState */)

  function loadVacations() {
    api.vacations.getAll().then((vacations) => {
      console.log(vacations)
    })
  }

  return (
    <div className="space-y-6 min-w-96">
      <button className="button block" onClick={loadVacations}>
        Load Vacations
      </button>
      {/* Start Map */}

      {/* <div className="p-3 overflow-hidden flex flex-col">
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
      </div> */}

      {/* End Map */}
    </div>
  )
}
