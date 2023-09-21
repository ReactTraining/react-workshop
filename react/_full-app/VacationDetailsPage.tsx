import { useLoaderData } from 'react-router-dom'
import { api } from '~/utils/api'
import { VacationImage } from '~/BrowseVacationsPage'
import { Heading } from '~/Heading'
import { SimilarVacations } from '~/SimilarVacations'
import { Card } from '~/Card'

export async function loader({ params }) {
  const id = parseInt(params.vacationId as string)
  const vacation = await api.vacations.getVacationCached(id)

  if (!vacation) throw new Response('Not Found', { status: 404 })
  return vacation
}

export function VacationDetailsPage() {
  const vacation = useLoaderData() as Awaited<ReturnType<typeof loader>>

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
