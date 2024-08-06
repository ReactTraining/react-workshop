import { configureStore, createReducer, createAction } from '@reduxjs/toolkit'

const initialState = { count: 0 }

// https://redux-toolkit.js.org/usage/usage-guide#using-action-creators-as-action-types
const increment = createAction() // fn -> { type: 1 }
const decrement = createAction() // fn -> { type: 2 }

const counterReducer = createReducer(initialState, {
  [increment]: (state, action) => {
    return { ...state, count: state.count + 1 }
  },
  [decrement]: (state, action) => {
    return { ...state, count: state.count - 1 }
  },
})

// instead of this...

// const reducers = combineReducers({
//   counterState: counterReducer,
// })
// const store = createStore(reducers)

// do this...

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
