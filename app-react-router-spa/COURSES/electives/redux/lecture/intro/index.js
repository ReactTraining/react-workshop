import { createStore, combineReducers } from 'redux'

// It's not "bad" to use createStore, they just recommend RTK now

const initialState = { count: 0 }

const counterReducer = (state, action) => {
  if (typeof state === 'undefined') return initialState
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 }
    case 'DECREMENT':
      return { ...state, count: state.count - 1 }
    default:
      return state
  }
}

// "This deprecation is solely a visual indicator that is meant to encourage
// users to migrate their apps from legacy Redux patterns to use the modern Redux Toolkit APIs."
const store = createStore(counterReducer)

store.subscribe(() => {
  console.log(store.getState())
})

store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'INCREMENT' })

// Next, show multiple reducers (code needs to be moved up)

// import counterReducer from './reducers/counterReducer'
// import authReducer from './reducers/authReducer'
// const reducers = combineReducers({
//   counterState: counterReducer,
//   authState: authReducer
// })
// const store = createStore(reducers)
