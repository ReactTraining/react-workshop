import { useRef, useId } from 'react'
import { renderMap } from '~/utils/maps'

export function GoogleMaps() {
  // ⭐️ Let's not use hard-coded ids for labels (use useId())

  // Use Refs instead
  const divEl = document.getElementById('map')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    // This will get everything as a string (we need values as numbers)
    // const pos = Object.fromEntries(formData)

    const pos = {
      lat: Number(formData.get('lat')),
      lng: Number(formData.get('lng')),
    }

    renderMap(divEl, {
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
            <input id="lat" type="text" name="lat" className="form-field" defaultValue="40.712" />
          </div>
          <div>
            <label htmlFor="lng" className="text-xs">
              Longitude
            </label>
            <input id="lng" type="text" name="lng" className="form-field" defaultValue="-74.006" />
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
