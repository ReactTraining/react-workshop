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

You will need internal state for your hook to track the delayedValue. We call it `state` here:

```js
export function useDelayedCallback(cb) {
  const [state, setState] = useState(null)

  function queueState(state, ms) {}

  return queueState
}
```

You'll also need to keep track of the milliseconds passed in and use a `useEffect` to run a JavaScript timeout when `state` or the milliseconds change. When the timeout resolves, call the callback.
