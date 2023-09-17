import { useEffect, useState, useRef, useId } from 'react'
import { GoogleMap, load } from '~/utils/maps'

load()

export function GoogleMaps() {
  const [formData, setFormData] = useState({
    lat: 40.712,
    lng: -74.006,
  })

  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    // const pos = Object.fromEntries(formData)

    const pos = {
      lat: Number(formData.get('lat')),
      lng: Number(formData.get('lng')),
    }

    GoogleMap(document.getElementById('map'), {
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
              type="text"
              name="lat"
              className="form-field"
              value={formData.lat}
              onChange={(event) => {
                setFormData({ ...formData, lat: parseInt(event.target.value) })
              }}
            />
          </div>
          <div>
            <label htmlFor="lng" className="text-xs">
              Longitude
            </label>
            <input
              id="lng"
              type="text"
              name="lng"
              value={formData.lng}
              className="form-field"
              onChange={(event) => {
                setFormData({ ...formData, lng: parseInt(event.target.value) })
              }}
            />
          </div>
        </div>
        <footer className="mt-3">
          <button type="submit" className="button">
            Submit
          </button>
        </footer>
      </form>
    </div>
  )
}

// function SelectRegion({ onChange }) {
//   const regions = [
//     { name: 'New York', lat: 40.712, lng: -74.006 },
//     { name: 'Chicago', lat: 41.878, lng: -87.629 },
//     { name: 'San Francisco', lat: 37.774, lng: -122.41 },
//   ]

//   return (
//     <div className="flex items-center gap-4">
//       <label htmlFor="region">Region</label>
//       <select
//         id="region"
//         className="form-field"
//         onChange={(event) => {
//           const region = regions.find((region) => region.name === event.target.value)
//           if (region) {
//             onChange({ lat: region.lat, lng: region.lng })
//           }
//         }}
//       >
//         <option>Make Selection</option>
//         {regions.map((region) => {
//           return <option>{region.name}</option>
//         })}
//       </select>
//     </div>
//   )
// }
