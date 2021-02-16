import { configureStore } from '@reduxjs/toolkit'
import { counterReducer } from './state/counterState'

const store = configureStore({
  reducer: {
    counterState: counterReducer,
  },
})

export default store
