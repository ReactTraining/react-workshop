# Lecture Notes

## Side Effects with Network Requests

- Open `Products.js`
- Query for products and explain the basics of effects

```js
const [products, setProducts] = useState(null)

useEffect(() => {
  let isCurrent = true
  api.products.getProducts().then(({ products }) => {
    if (!isCurrent) return
    setProducts(products)
  })
  return () => (isCurrent = false)
}, [])
```

## Side Effects with a subscription

- Create an effect with a subscription to see if the screen is wider than `800px`

```js
const [isWide, setIsWide] = useState(false)

useEffect(() => {
  const media = window.matchMedia('(min-width: 800px)')
  const listener = () => setIsWide(media.matches)
  media.addListener(listener)
  return () => media.removeListener(listener)
}, [])
```

- It might be easier to do a simple version like above before we refactor to this one
  which is more complete:

```js
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

## Custom Hooks

- Refactor each to be custom hooks
- Note that `wide` and `isWide` might be clearer when it's not a custom hook yet. These can also be the variables received from the custom hook:

```js
const isWide = useMedia('(min-width: 800px)')
```

But the variable in the hook should be refactored to something like `matches`
