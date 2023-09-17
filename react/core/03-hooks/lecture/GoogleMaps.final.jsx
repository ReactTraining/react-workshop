import { useEffect, useState, useRef, useId } from 'react'
import { GoogleMap } from '~/maps'

export function GoogleMaps() {
  const [pos, setPos] = useState({ lat: 40.712, lng: -74.006 })
  const mapRef = useRef()

  useEffect(() => {
    GoogleMap(mapRef.current, {
      center: pos,
      zoom: 10,
    })
  }, [pos])

  return (
    <div className="space-y-6">
      <div className="h-64 bg-slate-200" ref={mapRef} />
      <SelectRegion onChange={(pos) => setPos(pos)} />
    </div>
  )
}

function SelectRegion({ onChange }) {
  const id = useId()

  const regions = [
    { name: 'New York', lat: 40.712, lng: -74.006 },
    { name: 'Chicago', lat: 41.878, lng: -87.629 },
    { name: 'San Francisco', lat: 37.774, lng: -122.41 },
  ]

  return (
    <div className="flex items-center gap-4">
      <label htmlFor={id}>Region</label>
      <select
        id={id}
        className="form-field"
        onChange={(event) => {
          const region = regions.find((region) => region.name === event.target.value)
          if (region) {
            onChange({ lat: region.lat, lng: region.lng })
          }
        }}
      >
        {regions.map((region) => {
          return <option>{region.name}</option>
        })}
      </select>
    </div>
  )
}
