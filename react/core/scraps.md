```js
;<button className="button" onClick={zoomToMyLocation} disabled={loading}>
  {loading ? 'Loading...' : 'Find My Location'}
</button>
function zoomToMyLocation() {
  if (navigator.geolocation) {
    setLoading(true)
    navigator.geolocation.getCurrentPosition((position) => {
      setLoading(false)
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
      map.setCenter(pos)
      map.setZoom(8)
    })
  }
}
```
