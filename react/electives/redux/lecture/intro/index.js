import { createStore, combineReducers } from 'redux'

import counterReducer from './reducers/counterReducer'
import authReducer from './reducers/authReducer'

const reducers = combineReducers({
  counterState: counterReducer,
  authState: authReducer,
})

// "This deprecation is solely a visual indicator that is meant to encourage
// users to migrate their apps from legacy Redux patterns to use the modern Redux Toolkit APIs."
const store = createStore(reducers)

store.subscribe(() => {
  console.log(store.getState())
})

store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'INCREMENT' })
