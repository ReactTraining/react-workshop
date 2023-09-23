import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '~/utils/api'
import { VacationImage } from '~/BrowseVacationsPage'
import { Heading } from '~/Heading'
import { SimilarVacations } from '~/SimilarVacations'
import { Card } from '~/Card'
import type { Vacation } from '~/utils/types'

export function VacationDetailsPage() {
  const vacationId = parseInt(useParams().vacationId!)
  const [vacation, setVacation] = useState<Vacation | null>(null)

  useEffect(() => {
    api.vacations.getVacationCached(vacationId).then((vacation) => {
      setVacation(vacation)
    })
  }, [vacationId])

  if (!vacation) return <div>Loading...</div>

  return (
    <Card>
      <main className="space-y-6">
        <div className="flex gap-6">
          <div className="w-80 space-y-6">
            <VacationImage
              vacationId={vacation.id}
              alt={vacation.name}
              className="block object-cover aspect-video"
            />
            <section className="space-y-6">
              <Heading as="h2" size={4}>
                Similar Destinations
              </Heading>
              <SimilarVacations vacationIds={vacation.related || []} />
            </section>
          </div>
          <div className="flex-1 space-y-6">
            <header>
              <Heading>{vacation.name}</Heading>
            </header>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non obcaecati nobis suscipit
              ducimus dolores sequi accusantium, veritatis, nam labore, quidem optio ex iure
              temporibus tenetur adipisci perspiciatis ipsam soluta inventore?
            </p>
          </div>
        </div>
      </main>
    </Card>
  )
}
