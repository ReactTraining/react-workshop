import { useRef, useId } from 'react'
import { renderMap } from '~/utils/maps'

export function GoogleMaps() {
  const mapRef = useRef<HTMLDivElement>(null!)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const pos = {
      lat: Number(formData.get('lat')),
      lng: Number(formData.get('lng')),
    }

    // Use Refs Instead
    renderMap(mapRef.current, {
      center: pos,
      zoom: 10,
    })
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
