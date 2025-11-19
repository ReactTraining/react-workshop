import { useId, useRef, useEffect, useState, useMemo } from 'react'
import { renderMap } from '~/utils/maps'

// useId()
// useRef()
// useEffect()

// Change form to uncontrolled so we can submit form and then
// set state upon submission. That way we can respond to that state
// change in useEffect

// Pure Function
// 1. Idempotent: output is predicable based on input
// 2. Has no side effects

export function App() {
  const [lat, setLat] = useState(40.712)
  const [lng, setLng] = useState(-74.006)

  const mapRef = useRef<HTMLDivElement>(null!)

  // Any variable that we 'close over' that CAN CHANGE!! <-- is it "reactive"

  useEffect(() => {
    const pos = { lat, lng }
    renderMap(mapRef.current, {
      center: pos,
      zoom: 10,
    })
  }, [lat, lng]) // old !== new

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const lat = Number(formData.get('lat') as string)
    const lng = Number(formData.get('lng') as string)
    setLat(lat)
    setLng(lng)
  }

  const latId = useId() // :r0:

  return (
    <div className="space-y-6">
      <div className="h-64 bg-slate-200" ref={mapRef}></div>

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
