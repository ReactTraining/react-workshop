import { createStore, combineReducers } from 'redux'
import counterReducer from './reducers/counterReducer'
import authReducer from './reducers/authReducer'

const reducers = combineReducers({
  counterState: counterReducer,
  authState: authReducer,
})

const store = createStore(reducers)

// This would go in components where you need to subscribe
store.subscribe(() => {
  console.log(store.getState())
})

// THis would go into comp (events)
store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'INCREMENT' })
