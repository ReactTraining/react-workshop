import { configureStore } from '@reduxjs/toolkit'
import { authReducer, checkAuth } from './state/authSlice'
import { vacationsReducer } from './state/vacationsSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    vacations: vacationsReducer,
  },
})

// Determine if the user is already logged in. Since the store lives outside
// of React, we can kick this off before anything renders
store.dispatch(checkAuth())

export default store
