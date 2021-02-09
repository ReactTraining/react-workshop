import React, { useContext, useReducer, useCallback, useEffect } from 'react'
import { api } from 'ProjectPlanner/api'
import { User } from 'ProjectPlanner/types'

export type AuthContextActions = { type: 'LOGIN'; user: User } | { type: 'LOGOUT' }

type State = {
  authenticated: null | boolean
  user: null | User
}

type Context = State & {
  login(user: User): void
  logout(): void
}

const AuthStateContext = React.createContext<Context | null>(null)

export const AuthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(
    (state: State, action: AuthContextActions) => {
      switch (action.type) {
        case 'LOGIN': {
          return { authenticated: true, user: action.user }
        }
        case 'LOGOUT': {
          return { user: null, authenticated: false }
        }
        default:
          return state
      }
    },
    {
      // Null, meaning not determined yet.
      // False, meaning determined and not logged in
      // True, meaning logged in
      authenticated: null,
      user: null,
    }
  )

  const login = useCallback((user) => {
    dispatch({ type: 'LOGIN', user })
  }, [])

  const logout = useCallback(() => {
    dispatch({ type: 'LOGOUT' })
  }, [])

  useEffect(() => {
    let isCurrent = true
    api.auth.getAuthenticatedUser().then((user) => {
      if (user && isCurrent) {
        login(user)
      } else {
        logout()
      }
    })
    return () => {
      isCurrent = false
    }
  }, [login, logout])

  const context: Context = {
    ...state,
    login,
    logout,
  }

  return <AuthStateContext.Provider value={context} children={children} />
}

export function useAuth() {
  const context = useContext(AuthStateContext)
  if (!context) {
    throw Error('Use of useState is outside of Provider')
  }
  return context
}
