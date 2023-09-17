import { Loader } from '@googlemaps/js-api-loader'

const k = 'AIzaSyA-v7zWV5frDtyMg0qmSw36BRHwEJZNXIU'

const loader = new Loader({
  apiKey: k,
  version: 'weekly',
})

let Map

async function load() {
  if (!Map) {
    const MapsLib = await loader.importLibrary('maps')
    Map = MapsLib.Map
  }
  return Map
}

export async function GoogleMap(el, opt) {
  const Map = await load()
  const map = new Map(el, opt)
  return map
}
