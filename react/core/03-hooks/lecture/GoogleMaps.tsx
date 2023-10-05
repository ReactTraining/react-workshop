import { useRef, useId } from 'react'
import { GoogleMap } from '~/utils/maps'

export function GoogleMaps() {
  const divRef = useRef<HTMLDivElement>(null!) // { current: undefined }

  const latId = useId()
  const lngId = useId() // auto inc number: `:r1:`

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const pos = {
      lat: Number(formData.get('lat')),
      lng: Number(formData.get('lng')),
    }

    GoogleMap(divRef.current, {
      center: pos,
      zoom: 10,
    })
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
            <input id={latId} type="text" name="lat" className="form-field" defaultValue="40.712" />
          </div>
          <div>
            <label htmlFor={lngId} className="text-xs">
              Longitude
            </label>
            <input
              id={lngId}
              type="text"
              name="lng"
              className="form-field"
              defaultValue="-74.006"
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
