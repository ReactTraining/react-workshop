import * as React from 'react'
// 👀
// import type { UserNoPassword } from 'YesterTech/types'

const initialState = {
  authenticated: false,
  user: null,
}

const AuthStateContext = React.createContext(initialState)
const AuthDispatchContext = React.createContext(() => {})


export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

function reducer(state, action)  {
    switch (action.type) {
      case LOGIN: {
        return {
          ...state,
          authenticated: true,
          user: action.user,
        }
      }
      case LOGOUT: {
        return initialState
      }
      default:
        return state
    }
  }


export const AuthStateProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)

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

// 👀
// interface AuthState {
//   authenticated: boolean
//   user: null | UserNoPassword
// }
