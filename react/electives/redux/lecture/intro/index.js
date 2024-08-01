import { createStore, combineReducers } from 'redux'

// It's not "bad" to use createStore, they just recommend RTK now

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

store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'INCREMENT' })
