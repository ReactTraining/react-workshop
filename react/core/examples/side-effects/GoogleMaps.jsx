import { useEffect, useState, useRef, useId } from 'react'
import { LessonBody, LessonCard } from '~/Lesson'
import { Heading } from '~/Heading'
import { renderMap } from '~/utils/maps'

export function App() {
  return (
    <LessonBody>
      <LessonCard className="flex-1">
        <Heading>🗺️ Maps</Heading>
        <GoogleMaps />
      </LessonCard>
    </LessonBody>
  )
}

function GoogleMaps() {
  const [pos, setPos] = useState({ lat: 40.712, lng: -74.006 })
  const mapRef = useRef()
  const divRef = useRef()

  useEffect(() => {
    if (!mapRef.current) {
      renderMap(divRef.current, {
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
      <SelectRegion onChange={setPos} />
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
          return <option key={region.name}>{region.name}</option>
        })}
      </select>
    </div>
  )
}
