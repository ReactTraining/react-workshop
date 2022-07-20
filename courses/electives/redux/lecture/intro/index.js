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

store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'INCREMENT' })
