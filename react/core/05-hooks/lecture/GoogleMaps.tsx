import { useId, useRef, useEffect, useState } from 'react'
import { renderMap } from '~/utils/maps'

// useId()
// useRef()
// useEffect()

// Change form to uncontrolled so we can submit form and then
// set state upon submission. That way we can respond to that state
// change in useEffect

export function App() {
  const [lat, setLat] = useState(40.712)
  const [lng, setLng] = useState(-74.006)

  const latId = useId() // :r1:
  const lngId = useId() // :r2:
  const divRef = useRef<HTMLDivElement>(null)

  // Call this function at the end of the first render (always)
  // But then call this function again if x changes
  useEffect(() => {
    const pos = { lat, lng }

    // Use Refs Instead
    renderMap(divRef.current, {
      center: pos,
      zoom: 10,
    })
  }, [lat, lng])

  function action(formData: FormData) {
    const lat = parseInt((formData.get('lat') || '') as string)
    const lng = parseInt((formData.get('lng') || '') as string)
    setLat(lat)
    setLng(lng)
  }

  return (
    <div className="space-y-6">
      <div className="h-64 bg-slate-200" ref={divRef} />

      <form action={action}>
        <div className="flex gap-6">
          <div>
            <label htmlFor={latId} className="text-xs">
              Latitude
            </label>
            <input id={latId} type="number" name="lat" className="form-field" defaultValue={lat} />
          </div>
          <div>
            <label htmlFor={lngId} className="text-xs">
              Longitude
            </label>
            <input id={lngId} type="number" name="lng" className="form-field" defaultValue={lng} />
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
