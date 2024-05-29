import { useId, useRef, useEffect, useState } from 'react'
import { renderMap } from '~/utils/maps'

// useId
// useRef
// useEffect

export function App() {
  const [lat, setLat] = useState(40.712)
  const [lng, setLng] = useState(-74.006)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const pos = { lat, lng }

    // Use Refs Instead
    renderMap(document.getElementById('map'), {
      center: pos,
      zoom: 10,
    })
  }

  return (
    <div className="space-y-6">
      <div className="h-64 bg-slate-200" id="map" />

      <form onSubmit={handleSubmit}>
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
