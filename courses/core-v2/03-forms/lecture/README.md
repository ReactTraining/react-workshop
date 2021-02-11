# Forms

# Main Topics to Cover

- ✅ Refs (Uncontrolled Input Fields)
- ✅ Controlled Input Fields
- ✅ useReducer vs useState

# Lecture

- Start by teaching refs for username and password:

```ts
// All are different
const usernameRef = useRef()
const usernameRef = useRef<HTMLInputElement>(null)
const usernameRef = useRef<HTMLInputElement>(null!)
```

Possible extra material:

3. State Machines and State Charts (https://xstate.js.org/viz/)
4. Make our own `useState` that implements `useReducer`

```js
function useState(defaultState) {
  return useReducer((_, state) => state, defaultState)
}
```
