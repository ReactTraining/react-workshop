import { createStore, combineReducers } from 'redux'

import counterReducer from './reducers/counterReducer'
import authReducer from './reducers/authReducer'

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

store.dispatch(increment()) // action + type
store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'INCREMENT' })
