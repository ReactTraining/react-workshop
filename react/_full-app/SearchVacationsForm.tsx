import { useId, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import dayjs from 'dayjs'
import { useAuthContext } from '~/AuthContext'
import { api } from '~/utils/api'
import { InputDatePicker } from '~/InputDatePicker'

export function SearchVacationsForm() {
  const navigate = useNavigate()
  const { authenticated, user } = useAuthContext()
  const searchId = useId()
  const regionId = useId()
  const dateRangeId = useId()
  const priceId = useId()

  // The current URL
  const url = useLocation().pathname
  const [search] = useSearchParams()
  const urlSearch = search.get('search') || ''
  const urlRegion = search.get('region') || ''
  const urlStartDate = search.get('startDate') || ''
  const urlEndDate = search.get('endDate') || ''
  const urlPrice = parseInt(search.get('maxPrice') || '') || 4000

  console.log(urlSearch)

  // Controlled Fields
  const [price, setPrice] = useState(urlPrice)
  const [startDate, setStartDate] = useState(urlStartDate)
  const [endDate, setEndDate] = useState(urlEndDate)
  const [save, setSave] = useState(true)

  function onSelectDates(start: string, end: string) {
    setStartDate(start)
    setEndDate(end)
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const search = new URLSearchParams(new FormData(event.currentTarget) as any)

    if (startDate && endDate) {
      search.set('startDate', startDate)
      search.set('endDate', endDate)
    }

    const nextURL = `${url}?${search.toString()}`

    if (save) {
      if (authenticated && user) {
        api.users.saveSearch(user.id, search.toString()).catch(() => {
          // we don't do anything yet
        })
      } else {
        navigate('/login')
        return
      }
    }

    navigate(nextURL)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex flex-col gap-1">
        <label htmlFor={searchId} className="block text-lg">
          Search Vacations
        </label>
        <input
          name="search"
          defaultValue={urlSearch}
          type="text"
          placeholder="On the beach!"
          className="form-field"
          autoComplete="off"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor={regionId} className="block text-xs">
          Region
        </label>
        <select name="region" defaultValue={urlRegion} className="form-field block">
          <option>All</option>
          <option>Asia</option>
          <option>Africa</option>
          <option>Europe</option>
          <option>North America</option>
          <option>South America</option>
          <option>South Pacific</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor={dateRangeId} className="block text-xs">
          Dates
        </label>
        <InputDatePicker
          value={
            startDate && endDate
              ? dayjs(startDate).format('M/D/YYYY') + ' to ' + dayjs(endDate).format('M/D/YYYY')
              : 'All'
          }
          onSelectDates={onSelectDates}
          id={dateRangeId}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={priceId} className="block text-xs">
          Price
        </label>
        <input
          name="maxPrice"
          id={priceId}
          type="range"
          step="200"
          min="1000"
          max="4000"
          value={price}
          onChange={(event) => setPrice(parseInt(event?.target.value))}
        />
        <div className="text-xs">Vacations less than ${price}</div>
      </div>

      <hr />
      <div className="flex justify-between items-center">
        {authenticated ? (
          <label className="space-x-1 block">
            <input
              onChange={() => setSave(!save)}
              defaultChecked={save}
              type="checkbox"
              className="align-middle"
            />
            <span className="text-sm align-middle">Save My Search</span>
          </label>
        ) : (
          <Link to="/login">Login To Save Searches</Link>
        )}
        <button className="button" type="submit">
          Search
        </button>
      </div>
    </form>
  )
}
