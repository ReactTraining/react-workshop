import { useId, useRef, useEffect, useState, useMemo } from 'react'
import { renderMap } from '~/utils/maps'

// Change form to uncontrolled so we can submit form and then
// set state upon submission. That way we can respond to that state
// change in useEffect

export function App() {
  const latId = useId()
  const [lat, setLat] = useState(40.712)
  const [lng, setLng] = useState(-74.006)

  const divRef = useRef<HTMLDivElement>(null!)

  useEffect(() => {
    const pos = { lat, lng }
    renderMap(divRef.current, {
      center: pos,
      zoom: 10,
    })
  }, [lat, lng])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const lat = parseFloat(formData.get('lat') as string)
    const lng = parseFloat(formData.get('lng') as string)
    setLat(lat)
    setLng(lng)
  }

  return (
    <div className="space-y-6">
      <div className="h-64 bg-slate-200" ref={divRef} />

      <form onSubmit={handleSubmit}>
        <div className="flex gap-6">
          <div>
            <label htmlFor={latId} className="text-xs">
              Latitude
            </label>
            <input id={latId} name="lat" className="form-field" defaultValue={lat} />
          </div>
          <div>
            <label htmlFor="lng" className="text-xs">
              Longitude
            </label>
            <input id="lng" name="lng" className="form-field" defaultValue={lng} />
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
