import { configureStore, createReducer, createAction } from '@reduxjs/toolkit'

const initialState = { count: 0 }

// https://redux.js.org/toolkit/api/createReducer
const increment = createAction('INCREMENT')
const decrement = createAction('DECREMENT')

const counterReducer = createReducer(initialState, (builder) => {
  builder.addCase(increment, (state, action) => {
    return { ...state, count: state.count + 1 }
  })
  builder.addCase(decrement, (state, action) => {
    return { ...state, count: state.count - 1 }
  })
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
store.dispatch(increment())
