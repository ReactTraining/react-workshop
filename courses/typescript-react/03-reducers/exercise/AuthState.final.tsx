import * as React from 'react'
import type { UserNoPassword } from 'YesterTech/types'

const initialState: AuthState = {
  authenticated: false,
  user: null,
}

const AuthStateContext = React.createContext<AuthState>(initialState)
const AuthDispatchContext = React.createContext<AuthDispatch>(() => {})

export enum AuthActionTypes {
  Login = 'LOGIN',
  Logout = 'LOGOUT',
}

export const AuthStateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer((state: AuthState, action: AuthActions): AuthState => {
    switch (action.type) {
      case AuthActionTypes.Login: {
        return {
          ...state,
          authenticated: true,
          user: action.user,
        }
      }
      case AuthActionTypes.Logout: {
        return initialState
      }
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

export function useAuthDispatch(): AuthDispatch {
  return React.useContext(AuthDispatchContext)
}

export function useAuthState(): AuthState {
  return React.useContext(AuthStateContext)
}

interface AuthState {
  authenticated: boolean
  user: null | UserNoPassword
}

type AuthDispatch = React.Dispatch<AuthActions>

type AuthActions =
  | { type: AuthActionTypes.Login; user: UserNoPassword }
  | { type: AuthActionTypes.Logout }
