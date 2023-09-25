import { Loader } from '@googlemaps/js-api-loader'
import { db } from '~/utils/firebase'
import { doc, getDoc } from 'firebase/firestore'

let key = ''
let Map

export async function load() {
  if (key.length === 0) {
    const docRef = doc(db, 'google-maps-key', '1')
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      key = docSnap.data().apiKey
    } else {
      throw Error('Cannot get Google Maps API Key')
    }
  }

  const loader = new Loader({
    apiKey: key,
    version: 'weekly',
  })

  if (!Map) {
    const MapsLib = await loader.importLibrary('maps')
    Map = MapsLib.Map
  }
  return Map
}

load()

export async function GoogleMap(el, opt) {
  const Map = await load()
  const map = new Map(el, opt)
  return map
}
