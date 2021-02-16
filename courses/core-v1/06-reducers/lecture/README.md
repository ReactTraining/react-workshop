# Notes for Instructor

1. Teach the reducer pattern with vanilla JS first.
2. Convert the state in `LoginForm.tsx` to `useReducer`.

Possible extra material:

3. State Machines and State Charts (https://xstate.js.org/viz/)
4. Make our own `useState` that implements `useReducer`

```js
function useState(defaultState) {
  return useReducer((_, state) => state, defaultState);
}
```
