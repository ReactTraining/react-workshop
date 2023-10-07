import { useLoaderData } from 'react-router-dom'
import { api } from '~/utils/api'
import { Heading } from '~/Heading'
import { SimilarVacations } from '~/SimilarVacations'
import { Card } from '~/Card'
import { VacationImage } from '~/VacationImage'
import { FavoriteVacationButton } from './FavoriteVacationButton'

export async function loader({ params }) {
  const id = parseInt(params.vacationId as string)
  const vacation = await api.vacations.getVacation(id)
  if (!vacation) throw new Response('Not Found', { status: 404 })
  return vacation
}

type Props = {
  favorites: number[]
  isFavorite(id: number): boolean
  updateFavorite(id: number): void
}

export function VacationDetailsPage({ favorites, updateFavorite, isFavorite }: Props) {
  const vacation = useLoaderData() as Awaited<ReturnType<typeof loader>>

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
                <FavoriteVacationButton
                  id={vacation.id}
                  updateFavorite={updateFavorite}
                  isFavorite={isFavorite}
                />
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
