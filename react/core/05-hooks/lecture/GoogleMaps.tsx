import { useId, useRef, useEffect, useState } from 'react'
import { renderMap } from '~/utils/maps'

// useEffect()

// Change form to uncontrolled so we can submit form and then
// set state upon submission. That way we can respond to that state
// change in useEffect

export function App() {
  const mapRef = useRef<HTMLDivElement>(null!)

  const id = useId() // :r0:

  const [lat, setLat] = useState(40.712)
  const [lng, setLng] = useState(-74.006)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    setLat(parseInt(formData.get('lat') as string))
    setLng(parseInt(formData.get('lng') as string))
  }

  useEffect(() => {
    const pos = { lat, lng }

    // Use Refs Instead
    renderMap(mapRef.current, {
      center: pos,
      zoom: 10,
    })
  }, [lat, lng]) // oldlat !== newlat

  return (
    <div className="space-y-6">
      <div className="h-64 bg-slate-200" ref={mapRef} />

      <form onSubmit={handleSubmit}>
        <div className="flex gap-6">
          <div>
            <label htmlFor={id} className="text-xs">
              Latitude
            </label>
            <input id={id} type="number" name="lat" className="form-field" defaultValue={40.712} />
          </div>
          <div>
            <label htmlFor="lng" className="text-xs">
              Longitude
            </label>
            <input
              id="lng"
              type="number"
              name="lng"
              className="form-field"
              defaultValue={-74.006}
            />
          </div>
        </div>
        <footer className="mt-3">
          <button type="submit" className="button">
            Submit
          </button>
        </footer>
      </form>
    </div>
  )
}
