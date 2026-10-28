import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '~/utils/api'

// https://redux-toolkit.js.org/api/createAsyncThunk
// Each thunk automatically dispatches `pending`, `fulfilled`, and `rejected`
// actions that our slice can respond to

export const checkAuth = createAsyncThunk('auth/checkAuth', async () => {
  const user = await api.auth.getAuthenticatedUser()
  return user || null
})

export const login = createAsyncThunk('auth/login', ({ username, password }) => {
  return api.auth.login(username, password)
})

export const logout = createAsyncThunk('auth/logout', () => {
  return api.auth.logout()
})

const initialState = {
  // Null, meaning not determined yet.
  // False, meaning determined and not logged in
  // True, meaning logged in
  authenticated: null,
  user: null,
  loginStatus: 'idle', // 'idle' | 'loading'
  loginError: '',
}

// https://redux-toolkit.js.org/api/createSlice
// createSlice is createReducer + createAction in one step
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.authenticated = !!action.payload
        state.user = action.payload
      })
      .addCase(login.pending, (state) => {
        state.loginStatus = 'loading'
        state.loginError = ''
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginStatus = 'idle'
        state.authenticated = true
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.loginStatus = 'idle'
        state.loginError = action.error.message
      })
      .addCase(logout.fulfilled, (state) => {
        state.authenticated = false
        state.user = null
      })
  },
})

export const authReducer = authSlice.reducer

// Selectors
export const selectAuth = (state) => state.auth
