import { useId, useRef, useEffect, useState, useMemo } from 'react'
import { renderMap } from '~/utils/maps'

// useId()

export function App() {
  const [lat, setLat] = useState(40.712)
  const [lng, setLng] = useState(-74.006)

  // "stable" in react means it doesnt change unless we want it to

  const pos = useMemo(() => {
    return { lat, lng }
  }, [lat, lng])

  const mapRef = useRef<HTMLDivElement>(null!)

  useEffect(() => {
    renderMap(mapRef.current, {
      center: pos,
      zoom: 10,
    })
  }, [pos])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const lat = formData.get('lat') as string
    const lng = formData.get('lng') as string
    setLat(Number(lat))
    setLng(Number(lng))
  }

  const latId = useId() // :r0:
  const lngId = useId() // :r1:

  return (
    <div className="space-y-6">
      <div className="h-64 bg-slate-200" ref={mapRef} />

      <form onSubmit={handleSubmit}>
        <div className="flex gap-6">
          <div>
            <label htmlFor={latId} className="text-xs">
              Latitude
            </label>
            <input id={latId} type="number" name="lat" className="form-field" defaultValue={lat} />
          </div>
          <div>
            <label htmlFor="lng" className="text-xs">
              Longitude
            </label>
            <input id="lng" type="number" name="lng" className="form-field" defaultValue={lng} />
          </div>
        </div>
        <footer className="mt-3">
          <button type="submit" className="button">
            Update Map
          </button>
        </footer>
      </form>
    </div>
  )
}
