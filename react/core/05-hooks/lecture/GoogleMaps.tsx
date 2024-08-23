import { useId, useRef, useEffect, useState } from 'react'
import { renderMap } from '~/utils/maps'

// useEffect()

// Change form to uncontrolled so we can submit form and then
// set state upon submission. That way we can respond to that state
// change in useEffect

export function App() {
  const [lat, setLat] = useState(40.712)
  const [lng, setLng] = useState(-74.006)

  // Always: After the first render (mount)
  // Run again: if the dep array changes
  useEffect(() => {
    const pos = { lat, lng }

    // Use Refs Instead
    renderMap(mapRef.current, {
      center: pos,
      zoom: 10,
    })
  }, [lat, lng]) // old !== new

  const mapRef = useRef<HTMLDivElement>(null!)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const lat = parseInt((formData.get('lat') as string | null) || '')
    const lng = parseInt((formData.get('lng') as string | null) || '')
    setLat(lat)
    setLng(lng)
  }

  return (
    <div className="space-y-6">
      <div className="h-64 bg-slate-200" ref={mapRef} />

      <form onSubmit={handleSubmit}>
        <div className="flex gap-6">
          <div>
            <label htmlFor="lat" className="text-xs">
              Latitude
            </label>
            <input
              id="lat"
              // type="number"
              name="lat"
              className="form-field"
              required
              defaultValue={lat}
            />
          </div>
          <div>
            <label htmlFor="lng" className="text-xs">
              Longitude
            </label>
            <input
              id="lng"
              // type="number"
              name="lng"
              className="form-field"
              required
              defaultValue={lng}
            />
          </div>
        </div>
        <footer className="mt-3">
          <button type="submit" className="button">
            Load Map
          </button>
        </footer>
      </form>
    </div>
  )
}
