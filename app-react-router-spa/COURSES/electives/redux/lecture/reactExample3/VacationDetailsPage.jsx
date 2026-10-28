import { Link, useLocation, useParams, useRouteError } from 'react-router'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Heading } from '~/Heading'
import { VacationImage } from '~/VacationImage'
import { useAuth } from './AuthContext'
import { queryClient } from './queryClient'
import { vacationQuery } from './vacationQueries'

export function loader({ params }) {
  return queryClient.ensureQueryData(vacationQuery(Number(params.vacationId)))
}

function VacationDetailsPage() {
  const vacationId = Number(useParams().vacationId)
  const location = useLocation()
  const { authenticated, user } = useAuth()
  const { data: vacation } = useSuspenseQuery(vacationQuery(vacationId))

  return (
    <div className="flex flex-wrap gap-6">
      <VacationImage
        vacationId={vacation.id}
        alt={vacation.name}
        className="w-full max-w-96 aspect-video object-cover"
      />
      <div className="space-y-3">
        <Heading size={2}>{vacation.name}</Heading>
        <div className="text-xl">${vacation.price}</div>
        {authenticated === true && (
          <div className="space-y-3">
            <p>Ready to go, {user.name}?</p>
            <button className="button">Book Now</button>
          </div>
        )}
        {authenticated === false && (
          <Link to="/login" state={{ from: location.pathname }} className="button">
            Login to Book
          </Link>
        )}
      </div>
    </div>
  )
}

// Rendered by React Router when the loader throws
export function VacationDetailsError() {
  const error = useRouteError()
  return <div className="text-red-600">{String(error)}</div>
}

export default VacationDetailsPage
