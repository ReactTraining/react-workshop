import { useId, useRef, useEffect, useState } from 'react'
import { renderMap } from '~/utils/maps'

// useRef
// useEffect

export function App() {
  const mapRef = useRef<HTMLDivElement>(null!)

  const [lat, setLat] = useState(40.712)
  const [lng, setLng] = useState(-74.006)

  // After the first render, we call this function ALWAYS
  // after other re-renders, this function gets called only if the dep array parts change
  useEffect(() => {
    const pos = { lat, lng }

    // Use Refs Instead
    renderMap(mapRef.current, {
      center: pos,
      zoom: 10,
    })
  }, [lat, lng])

  // function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  //   event.preventDefault()
  // }

  return (
    <div className="space-y-6">
      <div className="h-64 bg-slate-200" ref={mapRef} />

      <form>
        <div className="flex gap-6">
          <div>
            <label htmlFor="lat" className="text-xs">
              Latitude
            </label>
            <input
              id="lat"
              type="number"
              name="lat"
              className="form-field"
              value={lat}
              onChange={(e) => setLat(Number(e.target.value))}
            />
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
              value={lng}
              onChange={(e) => setLng(Number(e.target.value))}
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
