import { useEffect, useRef } from 'react'
import { GoogleMap } from '~/utils/maps'

export function GoogleMaps({ pos }) {
  // Try to avoid referring to the DOM by unsafe references like ids
  // Use useRef instead
  const mapDiv = document.getElementById('map')

  // Don't worry about how useEffect works yet
  useEffect(() => {
    GoogleMap(mapDiv, {
      center: pos,
      zoom: 10,
    })
  }, [pos])

  return <div className="h-64" id="map"></div>
}
