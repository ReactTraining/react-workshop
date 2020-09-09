# Notes for Instructor

## promise-hook

Refactor `useProduct` to be more general, like `useApi`

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

- Might be good to show the evolution that beginners go through. Like what if we passed our own dependency like `useApi(..., [productId])`. This would work but the linter doesn't like it because we'd have to receive an argument inside `useApi` and then pass it into the effect's dependency array as a variable instead of an array literal.
- To solve that, the final solution should have `api` in the effect's dependency array, and to manage that api function being passed in, wrap it in useCallback:

```js
const products = useApi(
  useCallback(() => api.products.getProduct(productId), [productId])
)
```

This is also what we're calling "hooks composition". We can even refactor the `useApi` hook to be `usePromise` since it's so generic at this point it can be used for any promise based side effect.

## Composing State

// todo
