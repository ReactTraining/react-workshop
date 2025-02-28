import { api } from '~/utils/api'
import { Heading } from '~/Heading'
import { SimilarVacations } from '~/SimilarVacations'
import { Card } from '~/Card'
import { VacationImage } from '~/VacationImage'
import { FavoriteVacationButton } from '~/FavoriteVacationButton'
import { LoaderFunctionArgs, useLoaderData } from 'react-router'
import { queryClient } from '~/utils/queryClient'

export async function clientLoader({ params }: LoaderFunctionArgs) {
  const id = parseInt(params.vacationId!)

  const vacation = await queryClient.fetchQuery({
    queryKey: ['vacation', id],
    queryFn: () => api.vacations.getVacation(id),
    staleTime: 1000 * 30,
  })
  return vacation
}

type LoaderData = Awaited<ReturnType<typeof clientLoader>>

export function VacationDetailsPage() {
  const vacation = useLoaderData() as LoaderData

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
            <header className="md:flex md:justify-between md:items-center">
              <Heading>{vacation.name}</Heading>
              <div>
                <FavoriteVacationButton id={vacation.id} />
              </div>
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
