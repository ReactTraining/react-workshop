import * as React from 'react'
import { UserNoPassword } from 'YesterTech/types'
import { makeAutoObservable } from 'mobx'

function getInitialState(): AuthState {
  return {
    authenticated: false,
    user: null,
  }
}

class Auth {
  authenticated = false
  user: null | UserNoPassword = null

  constructor() {
    makeAutoObservable(this)
  }

  dispatch(action: AuthActions) {
    switch (action.type) {
      case 'LOGIN': {
        this.authenticated = true
        this.user = action.user
        break
      }
      case 'LOGOUT': {
        this.authenticated = false
        this.user = null
        break
      }
    }
  }
}

let auth = new Auth()

let AuthContext = React.createContext<Auth>(null!)

export const AuthStateProvider: React.FC = ({ children }) => {
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export function useAuthDispatch() {
  const auth = React.useContext(AuthContext)
  return React.useCallback((action: AuthActions) => {
    return auth.dispatch(action)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export function useAuthState(): AuthState {
  return React.useContext(AuthContext)
}

export interface AuthState {
  authenticated: boolean
  user: null | UserNoPassword
}

type AuthActions =
  | {
      type: 'LOGIN'
      user: UserNoPassword
    }
  | {
      type: 'LOGOUT'
    }
