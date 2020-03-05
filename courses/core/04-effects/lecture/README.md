# Notes for Instructor

There is no `index.js` file for this one. When you run the lecture and change the two files, your supposed to see those changes in the real application which runs with these as substitutes.

## Side Effects with a subscription

Have a quick conversation about responsive design and how we all probably know media queries are for doing things like hiding UI when the screen is small. But here we have a sidebar that does network requests and with media queries we would still get those network requests if the page were loaded on something like a phone. For this reason, sometimes a JavaScript solution is better because we can actually "unmount" the sidebar if the screen is too small. Since it's unmounted, it will not do side-effects like media queries.

- Open `ProductsSidebar.js`
- Browser: http://localhost:3000/products
- Create an effect with a subscription to see if the screen is wider than `800px`
- Hide the sidebar when the screen is too small

This could be how the code migrates through the lecture:

Maybe start by just showing this code. I think it's reasonable that people will try to do this when they learn react (to not use useEffect) so this is a good place to start to have that conversation:

```js
function ProductsSidebar() {
  const media = window.matchMedia('(min-width: 800px)')
  const isWide = media.matches

  // ...
}
```

We're doing a side effect but this effect is going to run every time this component re-renders (even when it doesn't need to) and it's NOT going to run when the browser size changes since we're not subscribed to it:

```js
function ProductsSidebar() {
  const media = window.matchMedia('(min-width: 800px)')

  media.addListener(() => {
    console.log(media.matches)
    // What now? We don't have anywhere to save the new value to
  })

  const isWide = media.matches

  // ...
}
```

The side effect still runs after every re-render (if there were other state or the parent were to re-render this component) but at least we're responding to the browser size changing. We just don't have anywhere to put the new data. Also, we would end up being multiple subscribed since we're always subscribing:

```js
function ProductsSidebar() {
  const query = '(min-width: 800px)'
  const [isWide, setIsWide] = useState(
    window.matchMedia(query).matches
  )

  useEffect(() => {
    const media = window.matchMedia(query)
    media.addListener(() => {
      setIsWide(media.matches)
    })
  }, [])

  // ...
}
```

Now:

1. The effect doesn't run with each re-render (explain the dep array).
2. We only subscribe once.
3. We have a way to update `isWide`.
4. Even if we kept the code before, it would have ran in SSR to which there is no `window`. React's side effects are always intended for the front-end. `useEffect` doesn't run in SSR, it only runs in front-end.

The new problem is that if this component were to unmount and then re-mount, we would have these subscriptions floating around in JS memory. So we need to "clean them up":

```js
useEffect(() => {
  const media = window.matchMedia(query)
  // Now it makes sense to have the listener be it's own variable
  const listener = () => setIsWide(media.matches)
  media.addListener(listener)
  return () => media.removeListener(listener)
}, [isWide])
```

## Side Effects with Network Requests

- Open `ProductProfile.js`
- Browser: http://localhost:3000/products/1 (or any valid Product ID)
- Query for product and explain the basics of effects
- API: `api.products.getProduct(productId)`

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
  const [matches, setMatches] = useState(
    window.matchMedia(query).matches
  )
  // ...
}

const isWide = useMedia('(min-width: 800px)')
```
