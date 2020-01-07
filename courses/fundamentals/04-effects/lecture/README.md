# Notes for Instructor

## Side Effects with a subscription

- Open `ProductsSidebar.js`
- Create an effect with a subscription to see if the screen is wider than `800px`
- Hide the sidebar when the screen is too small

```js
const [isWide, setIsWide] = useState(false)

useEffect(() => {
  const media = window.matchMedia('(min-width: 800px)')
  const listener = () => setIsWide(media.matches)
  media.addListener(listener)
  return () => media.removeListener(listener)
}, [])

// It might be easier to do a simple version like above before we refactor to this one
// which is more complete:

const query = '(min-width: 800px)'
const [isWide, setIsWide] = useState(window.matchMedia(query).matches)

useEffect(() => {
  const media = window.matchMedia(query)
  if (media.matches !== isWide) {
    setIsWide(media.matches)
  }
  const listener = () => setMatches(media.matches)
  media.addListener(listener)
  return () => media.removeListener(listener)
}, [isWide])
```

## Side Effects with Network Requests

- Open `ProductProfile.js`
- Browser: `http://localhost:3000/products/1` (or any valid Product ID)
- Query for product and explain the basics of effects
- Api: `api.products.getProduct(productId)`

```js
const [product, setProduct] = useState(null)

useEffect(() => {
  let isCurrent = true
  api.products.getProduct(productId).then(product => {
    if (!isCurrent) return
    setProduct(product)
  })
  return () => (isCurrent = false)
}, [productId])
```

NOTE: To help demonstrate the value of the `productId` in the dependency array, this example was chosen because the product profile page has "related products" and you can click one to change the profile and see the new data load.

## Custom Hooks

- Refactor each to be custom hooks
- The state variable names `wide` and `isWide` were good when it's not a custom hook yet. But in the custom hook using `matches` probably makes more sense

```js
function useMedia(query) {
  const [matches, setMatches] = useState(window.matchMedia(query).matches)
  // ...
}

const isWide = useMedia('(min-width: 800px)')
```
