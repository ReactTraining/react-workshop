# Notes for Instructor

There is no `index.tsx` file for this one. When you run the lecture and change the files, you're supposed to see those changes in the real application which runs with these as substitutes.

## Side Effects with Network Requests

- Open `ProductProfile.js`
- Browser: http://localhost:3000/products/1 (or any valid Product ID)
- Query for product and explain the basics of effects
- API: `api.products.getProduct(productId)`

```js
const [product, setProduct] = useState(null)

useEffect(() => {
  let isCurrent = true
  api.products.getProduct(productId).then((product) => {
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
function useProduct(productId) {
  // ...
}

function useMedia(query) {
  // ...
}

const product = useProduct(1)
const isWide = useMedia('(min-width: 800px)')
```
