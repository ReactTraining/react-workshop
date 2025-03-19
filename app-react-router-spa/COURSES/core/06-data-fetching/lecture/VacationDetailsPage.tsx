import { useEffect, useState } from 'react'
import { type LoaderFunctionArgs, useLoaderData, useParams } from 'react-router'
import { api } from '~/utils/api'
import { useQuery } from '@tanstack/react-query'
import { VacationImage } from '~/VacationImage'
import { Heading } from '~/Heading'
import { SimilarVacations } from './SimilarVacations'
import { Card } from '~/Card'
import type { Vacation } from '~/utils/types'
import { queryClient } from '~/utils/queryClient'

// Setting state on unmounted components
// https://github.com/facebook/react/pull/22114

export async function clientLoader({ params }: LoaderFunctionArgs) {
  const vacationId = parseInt(params.vacationId!)
  const vacation = await queryClient.ensureQueryData({
    queryKey: ['vacation', vacationId],
    queryFn: () => api.vacations.getVacation(vacationId),
    staleTime: 1000 * 30,
  })
  return vacation
}

export function VacationDetailsPage() {
  const vacation = useLoaderData()

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
