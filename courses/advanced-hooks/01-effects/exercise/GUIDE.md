# Advanced useEffects Concepts

## Task: Convert working class-based component to function-based with Hooks

Depending on your comfort level with the older class-based way of writing React components, you may or may not want to start with the class-based code we've given you. If you're not as comfortable, maybe it's best to just start with a blank function component and work your way up from there.

Here's the order of how things should work in the function component version of `ClapButton`

1. When the button is clicked, simply increment the `queueClaps` state.
2. Have a `useEffect` that runs when `queueClaps` changes and is above `0`
3. Set a timeout, where at the end of one second, you call `saveClapsToDatabase(queueClaps)`

```js
saveClapsToDatabase(queueClaps).then((latestClaps) => {
  // When this promise resolves, it gives you the most recent latest
  // claps from the database
})
```

4. When the promise resolves, set `queueClaps` back to `0` and update the `claps` to be the `latestClaps`.
5. Make sure you do a cleanup function. 🤔 What do you think needs to be cleaned up?
