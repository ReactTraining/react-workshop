import { useId, useRef, useEffect, useState, useMemo } from 'react'
import { renderMap } from '~/utils/maps'

export function App() {
  const [lat, setLat] = useState(40.712)
  const [lng, setLng] = useState(-74.006)
  const mapRef = useRef<HTMLDivElement>(null!)

  const pos = useMemo(() => {
    return { lat, lng }
  }, [lat, lng])

  useEffect(() => {
    renderMap(mapRef.current, {
      center: pos,
      zoom: 10,
    })
  }, [pos])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const lat = data.get('lat') as string
    const lng = data.get('lng') as string
    setLat(Number(lat))
    setLng(Number(lng))
  }

  const latId = useId()
  const lngId = useId()

  return (
    <div className="space-y-6">
      <div className="h-64 bg-slate-200" ref={mapRef} />

      <form onSubmit={handleSubmit}>
        <div className="flex gap-6">
          <div>
            <label htmlFor={latId} className="text-xs">
              Latitude
            </label>
            <input defaultValue={lat} id={latId} type="number" name="lat" className="form-field" />
          </div>
          <div>
            <label htmlFor="lng" className="text-xs">
              Longitude
            </label>
            <input defaultValue={lng} id="lng" type="number" name="lng" className="form-field" />
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
