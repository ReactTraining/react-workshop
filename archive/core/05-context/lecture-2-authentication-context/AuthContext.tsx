import { createContext, useContext, useReducer, useEffect } from 'react'
import { api } from 'react/_full-app/utils/api'
import type { User } from 'react/_full-app/utils/types'

type AuthActions = { type: 'LOGIN'; user: User } | { type: 'LOGOUT' }

type AuthState = {
  authenticated: boolean | null
  user: User | null
}

type AuthContextType = {
  authenticated: boolean | null
  user: User | null
  dispatch: React.Dispatch<AuthActions>
  // login(user: User): void
  // logout(): void
}

const AuthContext = createContext<AuthContextType>(null!)

type Props = {
  children: React.ReactNode
}

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(
    (state: AuthState, action: AuthActions) => {
      switch (action.type) {
        case 'LOGIN':
          return { ...state, authenticated: true, user: action.user }
        case 'LOGOUT':
          return { ...state, authenticated: false }

        default:
          return state
      }
    },
    {
      user: null,
      authenticated: null,
    }
  )

  // const login = (user: User) => {
  //   dispatch({ type: 'LOGIN', user })
  // }

  // function logout() {
  //   dispatch({ type: 'LOGOUT' })
  // }

  useEffect(() => {
    let isCurrent = true
    api.auth.getAuthenticatedUser().then((user: User) => {
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

  const context: AuthContextType = {
    authenticated: state.authenticated,
    user: state.user,
    dispatch,
    // login,
    // logout,
  }

  return <AuthContext.Provider value={context} children={children} />
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (!context) {
    throw Error('Use of `useAuthContext` is outside of `AuthProvider`')
  }
  return context || {}
}
