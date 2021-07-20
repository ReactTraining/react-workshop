import * as React from 'react'

const initialState = {
  authenticated: false,
  user: null,
}

const AuthStateContext = React.createContext({
  ...initialState,
  dispatch() {},
})

export const AuthStateProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(function authReducer(state, action) {
    switch (action.type) {
      case 'LOGIN':
        return { ...state, authenticated: true, user: action.user }
      case 'LOGOUT':
        return { ...initialState }
      default:
        return state
    }
  }, initialState)

  const value = {
    ...state,
    dispatch,
  }

  return <AuthStateContext.Provider value={value} children={children} />
}

export function useAuthState() {
  return React.useContext(AuthStateContext)
}

// 👀👀👀
export function useAuthDispatch() {
  return React.useContext(AuthStateContext).dispatch
}
