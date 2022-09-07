import { configureStore, createReducer, createAction } from '@reduxjs/toolkit'

const initialState = { count: 0 }

// https://redux-toolkit.js.org/usage/usage-guide#using-action-creators-as-action-types
const increment = createAction('I')
const decrement = createAction('D')

const counterReducer = createReducer(initialState, {
  [increment]: (state, action) => {
    return { ...state, count: state.count + action.payload || 1 }
  },
  [decrement]: (state, action) => {
    return { ...state, count: state.count - 1 }
  },
})

const store = configureStore({
  reducer: {
    counterState: counterReducer,
  },
})

store.subscribe(() => {
  console.log(store.getState())
})

store.dispatch(increment())
store.dispatch(increment())
store.dispatch(increment(4))
