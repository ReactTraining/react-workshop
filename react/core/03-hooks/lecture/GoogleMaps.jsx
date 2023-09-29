import { useEffect, useState, useRef, useId } from 'react'
import { GoogleMap } from '~/utils/maps'

export function GoogleMaps() {
  const [pos, setPos] = useState({ lat: 40.712, lng: -74.006 })
  const divRef = useRef()
  const mapRef = useRef()

  useEffect(() => {
    if (!mapRef.current) {
      GoogleMap(divRef.current, {
        center: pos,
        zoom: 10,
      }).then((map) => {
        mapRef.current = map
      })
    } else {
      mapRef.current.setCenter(pos)
    }
  }, [pos])

  return (
    <div className="space-y-6">
      <div className="h-64 bg-slate-200" ref={divRef} />

      <SelectRegion
        onChange={(pos) => {
          setPos(pos)
        }}
      />
    </div>
  )
}

function SelectRegion({ onChange }) {
  const regions = [
    { name: 'New York', lat: 40.712, lng: -74.006 },
    { name: 'Chicago', lat: 41.878, lng: -87.629 },
    { name: 'San Francisco', lat: 37.774, lng: -122.41 },
  ]

  return (
    <div className="flex items-center gap-4">
      <label htmlFor="region">Region</label>
      <select
        id="region"
        className="form-field"
        onChange={(event) => {
          const region = regions.find((region) => region.name === event.target.value)
          if (region) {
            onChange({ lat: region.lat, lng: region.lng })
          }
        }}
      >
        <option>Make Selection</option>
        {regions.map((region) => {
          return <option key={region.name}>{region.name}</option>
        })}
      </select>
    </div>
  )
}
