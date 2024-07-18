import { createStore, combineReducers } from 'redux'
import counterReducer from './reducers/counterReducer'
import authReducer from './reducers/authReducer'

// It's not "bad" to use createStore, they just recommend RTK now

const reducers = combineReducers({
  counterState: counterReducer,
  authState: authReducer,
})
const store = createStore(reducers)

store.subscribe(() => {
  console.log(store.getState())
})

function increment() {
  return { type: 'INCREMENT' }
}

store.dispatch(increment())
store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'INCREMENT' })
