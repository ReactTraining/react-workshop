# Notes for Instructor

## Main Concepts taught

- Assumes attendees already have a basic understanding of `useEffect`
- Since `useEffect` has a callback that "closes" over state, it ends up "capturing" the values of that state the moment the effect is created. This can be confusing if someone is doing async stuff and uses the state after the async operation and expects it to be the recent state.
- How to use `useEffect` correctly when other more complicated options might come to mind first.
- Debouncing async operations when frequent state changes.
- Phony `useEffect`. This requires phony `useState` and/or `useReducer` also since we need to have control over when a re-render happens because of a state change.

## Closure Basics

- The lesson starts out with no `useEffect`. Use the starting point to explain how the callback to `setTimeout` "closes" over `count` and therefore captures it's value at the time the callback is made. Therefore, if you click "Save Count to Database" and then click the "Count" button a few times, you'll get a message after the async save that tries to show what count is, and it shows the "captured" count instead of the most recent count.
- Refactor so the "Save Count to Database" button sets some state called `saving: true`. Then use a useEffect to run when `saving` is `true`. The effect will also capture the `count` value. See the `.final` for this implementation.
- Once nice trick is to leave `count` out of the dependency array and then to add it in to see the difference.

## Stopwatch

- In this lesson, the stopwatch is almost working but if you let it run for a while you'll see a flicker and glitching of the numbers. This is because `seconds` is in the dependency array and therefore we're remaking instances of `setInterval` every time `seconds` change.
- A more novice person in hooks might take `seconds` out and do an `eslint-disabled` rule. When we do this and click "Start", we see the seconds change from 0 to 1 and then stop. This is because of the closure "capturing" the `seconds` variable at the time `setInterval` is called.
- If the problem with having `seconds` be apart of the dep-array was that we create too many instances of the `setInterval`, lets return an `id` from `setInterval` so we can use it to do a cleanup -- `clearInterval(id)`
- Now with `seconds` in the dependency array, the previous setInterval will be cleared each time `seconds` changes and we'll make a new one. Hey wait a second, maybe we could use setTimeout instead? 🤔
- Maybe just have a quick conversation about switching to setTimeout, but ultimately the best solution in this case is to avoid the capturing all together:

```js
// ❌ Don't do this because it captures `seconds`
setSeconds(seconds + 1)

// ✅ This doesn't capture because the latests seconds is given to us by the function
setSeconds((seconds) => seconds + 1)
```

- Since the second way doesn't require our effect to close over `seconds`, we can remove it from the dependency array. And now that we're not capturing `seconds` but using the latest one from the function API, we can increment it correctly.

## Debounce

- Refactor class-based to function-based. Class-based currently uses lodash's debounce.
- When refactoring to function-based, a more novice React hooks developer might be tempted to do something like:

```js
const saveClaps = debounce(() => {
  // ...
}, 1000)
```

- The above code would mean `saveClaps` is a new "debounced" function on every state change (and buggy)
- The next step for many might be to use `useRef` like this to keep a debounce instance variable:

```js
const saveClaps = useRef(
  debounce((claps) => {
    saveClapsToDatabase(queueClaps).then((latestClaps) => {
      this.setState({
        claps: latestClaps,
        queueClaps: 0,
      })
    })
  }, 700)
)

function clap() {
  setQueueClaps(queueClaps + 1)
  saveClaps.current(queueClaps + 1)
}
```

- Technically this works, and it might be cool to teach these interesting ways to use `useRef` as instance variables. But we're still using lodash to debounce when we could just use `useEffect`. We also get other benefits of `useEffect` like cleaning up.
- To refactor to `useEffect`, the `clap()` function above just needs to set `queueClaps` and then the effect will just listen for when `queueClaps` is changed and above 0. Then it just sets a timeout for doing the save. See the `.final` the `useEffect` implementation without lodash.

## Phony Hooks

There's not much that can be documented here that does a better job than just reviewing and studying the `.final` version. However, If I had already done phony `useState` for the workshop before, I'd just go copy that and refactor it to be a `useReducer` to save time.
