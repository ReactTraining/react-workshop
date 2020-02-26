# Reducers

## Task One: Convert `useState` state to `useReducer`

1. Open `CheckoutBilling.js`.
2. Use the reducer pattern with `useReducer` to start to migrate the old state into `useReducer`. Start by only migrating `sameAsBilling` just to get started. Here's a template for useReducer if you need it.

```js
const [state, dispatch] = useReducer(
  (state, action) => {
    switch (action.type) {
      case 'TOGGLE_SAME_AS_BILLING':
        return {
          ...state,
          sameAsBilling: !state.sameAsBilling
        }
      default:
        return state
    }
  },
  {
    sameAsBilling: false
  }
)
```

3. See if you can get the form working with only `sameAsBilling` refactored first. You might notice that the code uses the variable `sameAsBilling` in several places and those might need to be converted to `state.sameAsBilling`. Or, you can do some destructuring:

```js
// hint, we think you should do this instead of using state.sameAsBilling. It also
// helps make Task Two easier:
const { sameAsBilling } = state
```

## Task Two: Convert the the form's input values

1. Once you have the basic ideas down from task one, now you can start to convert the form fields. Should you have a different action type for each field? You could, or you could have one action like this for all fields:

```js
case 'CHANGE_FIELD': {
  // The square brackets in the parameter name allow us to do dynamic parameter names
  //                 ▼            ▼
  return { ...state, [action.field]: action.value }
}
```

The idea here is that now you can do your dispatches like this where you specify the value AND the field it goes to:

```js
dispatch({
  type: 'CHANGE_FIELD',
  field: 'billingName',
  value: 'Cassidy'
})
```

2. Make sure you edit the `const { sameAsBilling } = state` to include the form fields. See the final solution if you need to see what we mean.
