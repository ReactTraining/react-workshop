import { useEffect } from 'react'
import { Link, useLocation, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { Heading } from '~/Heading'
import { VacationImage } from '~/VacationImage'
import { selectAuth } from './state/authSlice'
import { fetchVacation, selectVacationById } from './state/vacationsSlice'

function VacationDetailsPage() {
  const vacationId = Number(useParams().vacationId)
  const location = useLocation()
  const dispatch = useDispatch()

  const { authenticated, user } = useSelector(selectAuth)
  const vacation = useSelector((state) => selectVacationById(state, vacationId))
  const detailStatus = useSelector((state) => state.vacations.detailStatus)
  const detailError = useSelector((state) => state.vacations.detailError)

  // If we came from the list page, the vacation is already in the store and
  // the thunk's `condition` skips the request
  useEffect(() => {
    dispatch(fetchVacation(vacationId))
  }, [dispatch, vacationId])

  if (!vacation) {
    if (detailStatus === 'failed') return <div className="text-red-600">{detailError}</div>
    return <div>Loading...</div>
  }

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

export default VacationDetailsPage
