# Reducers

## Task: Convert the existing state to `useReducer` instead of `useState`

If you think it will be easier, just do the `showPassword` first and leave the state for the form fields until you finish the `showPassword`.

1. First, setup the reducer's body with some initial state. Be sure to keep the same names and default values as before:

```js
const [state, dispatch] = useReducer(
  (state, action) => {
    switch (action.type) {
      case '???': {
        return { ...state }
      }
      default:
        return state
    }
  },
  {
    // ???
  }
)
```

2. Since reducer returns a `state` object, you'll need to update all the code to be things like `state.billingName` or you can do destructuring like this:

```js
const { billingName, billingAddress } = state
```

3. Choosing your action types might require some thought. Since this is a form, you could have an action type for each field. This might be easier for you to reason about at first. But you could also do one action type for all fields like this:

```js
case 'CHANGE_FIELD': {
  return { ...state, [action.field]: action.value }
  //                 ^            ^
  // The square brackets in the parameter name allow us to do dynamic parameter names
}
```

If you did it this way, your dispatches would look like this:

```js
dispatch({ type: 'CHANGE_FIELD', field: 'billingName', value: 'Cassidy' })
```
