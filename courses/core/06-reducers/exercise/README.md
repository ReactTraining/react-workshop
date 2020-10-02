# Reducers

## Task One: Convert `useState` state to `useReducer`

1. Open `Quantity.js`.
2. Use the reducer pattern with `useReducer` to start to migrate the old state into `useReducer`. Here's a template for `useReducer` if you need it.

```js
const [state, dispatch] = useReducer(
  (state, action) => {
    switch (action.type) {
      case 'SUBTRACT':
        return {}
      case 'ADD':
        return {}
      case 'INPUT':
        return {}
      default:
        return state
    }
  },
  {
    quantity: 0
  }
)
```

You can use the above "action types" if you want to match the final.

Remember, you dispatch like this:

```js
dispatch({ type: 'INPUT', value: 1 })
```
