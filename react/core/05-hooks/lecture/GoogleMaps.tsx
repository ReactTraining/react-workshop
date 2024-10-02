import { useId, useRef, useEffect, useState } from 'react'
import { renderMap } from '~/utils/maps'

// useId()
// useRef()
// useEffect()

// Change form to uncontrolled so we can submit form and then
// set state upon submission. That way we can respond to that state
// change in useEffect

export function App() {
  const [lat, setLat] = useState(40.712)
  const [lng, setLng] = useState(-74.006)

  const latId = useId()
  const lngId = useId()

  // Imperative
  const mapRef = useRef<HTMLDivElement>(null!)

  // After the first render phase (always)
  // Then it runs again after other renders, if the dep array values change
  useEffect(() => {
    const pos = { lat, lng }
    renderMap(mapRef.current, {
      center: pos,
      zoom: 10,
    })
  }, [lat, lng])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const lat = Number(data.get('lat') as string)
    const lng = Number(data.get('lng') as string)
    setLat(lat)
    setLng(lng)
  }

  return (
    <div className="space-y-6">
      <div className="h-64 bg-slate-200" ref={mapRef} />

      <form onSubmit={handleSubmit}>
        <div className="flex gap-6">
          <div>
            <label htmlFor={latId} className="text-xs">
              Latitude
            </label>
            <input
              id={latId}
              type="number"
              name="lat"
              className="form-field"
              defaultValue={lat}
              // value={lat}
              // onChange={(e) => setLat(Number(e.target.value))}
            />
          </div>
          <div>
            <label htmlFor={lngId} className="text-xs">
              Longitude
            </label>
            <input
              id={lngId}
              type="number"
              name="lng"
              className="form-field"
              defaultValue={lng}
              // onChange={(e) => setLng(Number(e.target.value))}
            />
          </div>
        </div>
        <footer className="mt-3">
          <button type="submit" className="button">
            Update
          </button>
        </footer>
      </form>
    </div>
  )
}
