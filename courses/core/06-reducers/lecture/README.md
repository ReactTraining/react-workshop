# Notes for Instructor

1. Teach the reducer pattern with vanilla JS first.
2. Convert the state in `LoginForm.js` to `useReducer`.

Possible extra material:

3. State machines
4. Make our own `useState` that implements `useReducer`

```js
function useState(defaultState) {
  return useReducer((_, state) => state, defaultState)
}
```
