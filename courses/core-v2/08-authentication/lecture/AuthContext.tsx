import React, { useContext, useReducer, useCallback, useEffect } from 'react'
import { api } from 'ProjectPlanner/api'
import { User } from 'ProjectPlanner/types'

type AuthContextActions = { type: 'LOGIN'; user: User } | { type: 'LOGOUT' }

type State = {
  authenticated: null | boolean
  user: null | User
}

type Context = State & {
  dispatch: React.Dispatch<AuthContextActions>
  // login(user: User): void
  // logout(): void
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

  useEffect(() => {
    let isCurrent = true
    api.auth.getAuthenticatedUser().then((user) => {
      if (user && isCurrent) {
        dispatch({ type: 'LOGIN', user })
      } else {
        dispatch({ type: 'LOGOUT' })
      }
    })
    return () => {
      isCurrent = false
    }
  }, [])

  const context: Context = {
    ...state,
    dispatch,
    // login,
    // logout,
  }

  return <AuthStateContext.Provider value={context} children={children} />
}

export function useAuth() {
  const context = useContext(AuthStateContext)
  if (!context) {
    throw Error('Use of useAuth is outside of Provider')
  }
  return context
}
