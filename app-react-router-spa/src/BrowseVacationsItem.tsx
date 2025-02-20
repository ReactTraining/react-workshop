import { Link } from 'react-router'
import { VacationImage } from '~/VacationImage'
import type { Vacation } from '~/utils/types'

type Props = {
  vacation: Vacation
}

export function BrowseVacationsItem({ vacation }: Props) {
  return (
    <div className="p-3 overflow-hidden flex flex-col">
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
        <div className="flex gap-2">
          <div className="w-full flex flex-col">
            <Link to={`/vacations/${vacation.id}`} className="button">
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
