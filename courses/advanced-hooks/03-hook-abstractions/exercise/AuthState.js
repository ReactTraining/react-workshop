import * as React from 'react'

const initialState = {
  authenticated: false,
  user: null,
}

const AuthStateContext = React.createContext(initialState)
const AuthDispatchContext = React.createContext(function dispatch() {})

export function AuthStateProvider({ children }) {
  const [state, dispatch] = React.useReducer((state, action) => {
    switch (action.type) {
      case 'LOGIN':
        return { ...state, authenticated: true, user: action.user }
      case 'LOGOUT':
        return { ...initialState }
      default:
        return state
    }
  }, initialState)

  return (
    <AuthDispatchContext.Provider value={dispatch}>
      <AuthStateContext.Provider value={state}>{children}</AuthStateContext.Provider>
    </AuthDispatchContext.Provider>
  )
}

export function useAuthDispatch() {
  return React.useContext(AuthDispatchContext)
}

export function useAuthState() {
  return React.useContext(AuthStateContext)
}
