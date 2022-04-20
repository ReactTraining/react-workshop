# Notice Timeout

## Task 1

Create a hook called `useDelayedCallback`. It will allow you to register a callback function that will be called after a specified number of milliseconds

Usage and API:

```js
function MyComponent() {
  // Calling this hook will give you a function. When that
  // function is called (see `someEvent` below) you can pass two arguments.
  // The first is the delayed value and the second a millisecond time
  // to wait before the callback is called
  const myFunction = useDelayedCallback((delayedValue) => {
    console.log(`Hello from ${delayedValue}`)
  })

  // When someEvent is called, a two-second delay occurs before the above
  // console.log for "Hello from Brad"
  function someEvent() {
    myFunction('Brad', 2000)
  }

  // ...
}
```

Think of `queueState`'s job as being to set some temporary state, we call it `callbackValue`. Then an effect will see that state changes and it will start a timeout to wait to call the `cb` callback function with that temp `callbackValue`

```js
export function useDelayedCallback(cb) {
  const [callbackValue, setCallbackValue] = useState(null)

  function queueState(callbackValue, ms) {
    // ...
  }

  return queueState
}
```
