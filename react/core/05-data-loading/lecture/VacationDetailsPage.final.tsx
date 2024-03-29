import { useLoaderData } from 'react-router-dom'
import { api } from '~/utils/api'
import { VacationImage } from '~/VacationImage'
import { Heading } from '~/Heading'
import { SimilarVacations } from '~/SimilarVacations'
import { Card } from '~/Card'

export async function loader({ params }) {
  const id = parseInt(params.vacationId as string)
  const vacation = await api.vacations.getVacation(id)

  if (!vacation) throw new Response('Not Found', { status: 404 })
  return vacation
}

export function VacationDetailsPage() {
  const vacation = useLoaderData() as Awaited<ReturnType<typeof loader>>

  if (!vacation) return <div>Loading...</div>

  return (
    <Card>
      <main className="space-y-6">
        <div className="flex gap-6">
          <div className="w-80 relative group">
            <span className="bg-slate-800 text-white text-xs absolute top-0 right-0 py-1 px-2 hidden group-hover:block">
              {vacation.id}
            </span>
            <VacationImage
              vacationId={vacation.id}
              alt={vacation.name}
              className="block object-cover aspect-video"
            />
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
        <section className="space-y-6">
          <Heading as="h2" size={4}>
            Similar Destinations
          </Heading>
          <SimilarVacations vacationIds={vacation.related || []} />
        </section>
      </main>
    </Card>
  )
}
