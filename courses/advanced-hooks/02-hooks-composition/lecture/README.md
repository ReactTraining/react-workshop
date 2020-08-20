# Notes for Instructor

Refactor `index` to use `useApi` instead of `useProduct` for more general use:

```js
function useApi(api) {
  const [response, setResponse] = useState(null)

  useEffect(() => {
    let isCurrent = true
    api().then(response => {
      if (!isCurrent) return
      setResponse(response)
    })
    return () => (isCurrent = false)
  }, [])
  // ▲ The linter will complain about this, it wants `api` here.

  return response
}

function ProductProfile({ productId }) {
  const products = useApi(() => api.products.getProduct(productId))

  // ...
}
```

Before when `useProduct` was simply passed a `productId`, it was easy to include that into the dependency array. But now that `useApi` is more general, we'll be passing in a callback for the promise-based API call, so what do we add to the dependency array?

- If we leave it empty, we'll get that lint error that says it wants us to `api` in it.
- If we put API in it with the way we're passing a function into `useApi`, that function is guaranteed to change its identity each time `ProductProfile` re-renders for any reason.

Look at it from the perspective of this line:

```js
const products = useApi(() => api.products.getProduct(productId))
```

How are we going to re-run the effect if `productId` changes?

We could try something like this:

```js
const products = useApi(() => api.products.getProduct(productId), [
  productId
])
```

...and create our own concept of a dependency array. Then we'd take that argument and plug it into the effect's array? The linter will complain about that too since it cannot statically analyze that array. In other words:

```js
export default function useApi(api, depArray) {
  useEffect(() => {
    // ...
  }, depArray)
  // ▲ The linter will be like "What the heck, I don't know what you have in there"
}
```

The solution is `useCallback` like this:

```js
const getProducts = useCallback(
  () => api.products.getProduct(productId),
  [productId]
)
const products = useApi(getProducts)
```

And now the dependency array in the effect can just be `[api]`. Before we used `useCallback` the function being passed in was an anonymous arrow function that would change for every render. But now `useCallback` ensures that identity remains the same until `productId` changes.

Hooks can also be composed, since their just functions (Hooks Composition):

```js
const products = useApi(
  useCallback(() => api.products.getProduct(productId), [productId])
)
```

## Refactor to `usePromise`

Hey, that `useApi` thing is actually so generic, it could be used for any promise-based function. Maybe we can just call it `usePromise()`. Let's also make it based on `useReducer` as a small state-machine:

```js
export default function usePromise(api) {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'LOADING':
          return { ...state, loading: true }
        case 'RESOLVED':
          return {
            ...state,
            loading: false,
            response: action.response,
            error: null
          }
        case 'ERROR':
          return {
            ...state,
            loading: false,
            response: null,
            error: action.error
          }
        default:
          return state
      }
    },
    {
      loading: false,
      response: null,
      error: null
    }
  )

  useEffect(() => {
    let isCurrent = true
    dispatch({ type: 'LOADING' })
    api()
      .then(response => {
        if (!isCurrent) return
        dispatch({ type: 'RESOLVED', response })
      })
      .catch(error => {
        dispatch({ type: 'ERROR', error })
      })
    return () => (isCurrent = false)
  }, [api])

  return [state.response, state.loading, state.error]
}
```
