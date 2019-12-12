# Lecture Notes

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
}, [])
```

NOTE: That the fact that the product profile page has "related products" allows you to change pages and if the dependency array of the effect has the `productId`, then the new product is loaded. Doing this lecture with this product profile page was chosen for this main reason.

## Custom Hooks

- Refactor each to be custom hooks
- Note that `wide` and `isWide` might have been clearer when it's not a custom hook yet. But the variable in the hook should be refactored to something like `matches`

```js
const isWide = useMedia('(min-width: 800px)')
```
