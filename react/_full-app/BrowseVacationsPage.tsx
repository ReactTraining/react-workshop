import { Link, useLoaderData } from 'react-router-dom'
import { Tiles } from '~/Tiles'
import { api } from '~/utils/api'
import type { Vacation } from '~/utils/types'

export async function loader({ request }) {
  const searchParams = new URL(request.url).searchParams
  const maxPrice = searchParams.get('max-price')

  const dbSearch = new URLSearchParams()
  if (maxPrice) {
    dbSearch.set('price_lte', maxPrice)
  }

  return api.vacations.getAll(dbSearch.toString())
}

export function BrowseVacationsPage() {
  const vacations = useLoaderData() as Vacation[]

  return (
    <Tiles>
      {vacations.map((vacation) => {
        return (
          <div key={vacation.id} className="bg-white border">
            <BrowseVacationsItem vacation={vacation} />
          </div>
        )
      })}
    </Tiles>
  )
}

/**
 * Browse Vacation Items
 */

type BrowseVacationsItemProps = {
  vacation: Vacation
}

export function BrowseVacationsItem({ vacation }: BrowseVacationsItemProps) {
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

/**
 * Vacation Images
 */

type VacationImageProps = {
  vacationId: number
  alt: string
} & React.HTMLAttributes<HTMLImageElement>

export function VacationImage({ vacationId, alt, ...props }: VacationImageProps) {
  return <img {...props} alt={alt} src={`/images/vacations/${vacationId}.jpg`} />
}
