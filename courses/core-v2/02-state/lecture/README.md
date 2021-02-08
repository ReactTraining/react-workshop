# State Lecture

# Main Topics to Cover

- ✅ TypeScript Primer
- ✅ State with useState
- ✅ Fragments
- ✅ Controlled vs Uncontrolled Input Fields
- ✅ State Lifting

# Lecture

- This might be a great time to do a little TypeScript primer. Not too much, just some basics for the lesson. Generics would be good to approach too since it's so heavily used.
- Teach the `useState` API
- Still going with the theme of "how to think in React", emphasize the underlying mechanics of re-renders on state changes, the virtual dom which is buffering what updates the real dom, and "UI is a function of state".
- Use `useState` again for an error message. This helps explain nuances of two states and some of the other points listed below.
- Fragments: If you put your error message anywhere in the existing JSX, the DOM might not play nicely with it because of the flexbox strategy. Might be a good tangent conversation to bring up fragments. See `.final`.
- Emphasize how calling `setMinutes` will "queue" the next render. This is why setting minutes and then checking it's value to see if we are negative won't work:

```js
function subtract() {
  setMinutes(minutes - 1)
  if (minutes < 0) {
    setError('Cannot be less than 1')
  }
}
```

- Create our own version of `useState` if the timing is right and if it's right for the group. See `.final`.
- Convert the `<div>{minutes}</div>` to an input field to explain controlled vs uncontrolled input fields.

# Extra

- If there's time, explain lifting state. Simply lift the minutes state to `App`. This is a good primer for the exercise which requires knowledge of listed state.
