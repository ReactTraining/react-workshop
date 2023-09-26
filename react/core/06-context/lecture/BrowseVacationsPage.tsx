import { useEffect, useState, useContext, memo } from 'react'
import classnames from 'classnames'
import { api } from '~/utils/api'
import { Tiles } from '~/Tiles'
import { Card } from '~/Card'
import type { Vacation } from '~/utils/types'
import { VacationImage } from '~/VacationImage'
import { Icon } from '~/Icon'
// import { useFavoriteContext } from './FavoriteProvider'

type Props = {
  updateFavorite(id: number): void
  isFavorite(id: number): boolean
}

export const BrowseVacationsPage = ({ updateFavorite, isFavorite }: Props) => {
  const [vacations, setVacations] = useState<Vacation[] | null>(null)

  // Over-simplified useEffect
  useEffect(() => {
    api.vacations.getAll().then(setVacations)
  }, [])

  return (
    <div>
      {!vacations && (
        <Card>
          <div>Loading...</div>
        </Card>
      )}
      {vacations ? (
        <Tiles minSize={10}>
          {vacations.map((vacation) => {
            return (
              <div key={vacation.id} className="bg-white border">
                <div className="p-3 overflow-hidden flex flex-col">
                  <div className="h-32 -m-3 flex">
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
                        <FavoriteVacationButton
                          id={vacation.id}
                          updateFavorite={updateFavorite}
                          isFavorite={isFavorite}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </Tiles>
      ) : null}
    </div>
  )
}

type ButtonProps = {
  id: number
  updateFavorite(id: number): void
  isFavorite(id: number): boolean
}

function FavoriteVacationButton({ id, updateFavorite, isFavorite }: ButtonProps) {
  const vacationIsFavorite = isFavorite(id)

  return (
    <button
      className={classnames(`button button-outline`, {
        '!text-yellow-500': vacationIsFavorite,
      })}
      onClick={() => updateFavorite(id)}
    >
      {vacationIsFavorite ? <Icon name="star" /> : <Icon name="starOutline" />}
      <span>Favorite</span>
    </button>
  )
}
