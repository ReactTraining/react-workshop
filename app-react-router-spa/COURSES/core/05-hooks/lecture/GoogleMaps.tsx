import { useId, useRef, useEffect, useState } from 'react'
import { renderMap } from '~/utils/maps'

export function App() {
  const [lat, setLat] = useState(40.712)
  const [lng, setLng] = useState(-74.006)

  const mapRef = useRef<HTMLDivElement>(null!)

  useEffect(() => {
    const pos = { lat, lng }
    renderMap(mapRef.current, {
      center: pos,
      zoom: 10,
    })
  }, [pos])

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const lat = Number(String(formData.get('lat')))
    const lng = Number(String(formData.get('lng')))
    setLat(lat)
    setLng(lng)
  }

  const latId = useId() // :r0:
  const lngId = useId() // :r1:

  return (
    <div className="space-y-6">
      <div className="h-64 bg-slate-200" ref={mapRef} />

      <form onSubmit={handleSubmit} data-form>
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
