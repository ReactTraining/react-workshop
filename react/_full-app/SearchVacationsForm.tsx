import { useId, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuthContext } from '~/AuthContext'
import { api } from '~/utils/api'

export function SearchVacationsForm() {
  const { authenticated, user } = useAuthContext()
  const searchId = useId()
  const regionId = useId()
  const priceId = useId()

  // The current URL
  const url = useLocation().pathname
  const navigate = useNavigate()
  const [search] = useSearchParams()
  const urlPrice = parseInt(search.get('max-price') || '') || 4000

  // Controlled Fields
  const [price, setPrice] = useState(urlPrice)
  const [save, setSave] = useState(true)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const search = new URLSearchParams(new FormData(event.currentTarget) as any)
    const nextURL = `${url}?${search.toString()}`

    if (save) {
      if (authenticated && user) {
        api.users.saveSearch(user.id, search.toString()).catch(() => {
          // noop
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
        <label htmlFor={searchId} className="block text-xs">
          Search Keyword
        </label>
        <input
          name="search"
          type="text"
          placeholder="Search Vacations"
          className="form-field"
          autoComplete="off"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor={regionId} className="block text-xs">
          Region
        </label>
        <select name="region" className="form-field block">
          <option>All</option>
          <option>Asia</option>
          <option>Africa</option>
          <option>Europe</option>
          <option>North America</option>
          <option>South America</option>
          <option>South Pacific</option>
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor={priceId} className="block text-xs">
          Price
        </label>
        <input
          name="max-price"
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
          <label className="space-x-1">
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
        <button className="button">Search</button>
      </div>
    </form>
  )
}
