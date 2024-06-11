# Synchronization

There are two practices. The notes for each are embedded as comments in their respective files.

# Practice 1: Clipboard

See `Clipboard.tsx` for notes

# Practice 2: LocalStorage

See `LocalStorage.tsx` for notes.

Also, here's a template for how to use `useSyncExternalStore`

```js
function getSnapshot() {
  // Whatever you return here will be the starting
  // `value` returned from useSyncExternalStore()
}

function subscribe(callback) {
  // Usually you subscribe to some store here. When the subscription
  // wants to change our value, call the callback fn
  callback(newValue)
  // This will now re-render our component can will be the `value`
  // returned from useSyncExternalStore()

  // When you return a function from subscribe, you're registering
  // a cleanup to be called when the component unmounts. It's similar
  // to useEffect's cleanup
  return () => {
    // Usually you "unsubscribe" here
  }
}

function MyComponent() {
  const value = useSyncExternalStore(subscribe, getSnapshot)
}
```
