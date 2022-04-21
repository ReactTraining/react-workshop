import { createContext, useContext, useReducer, useEffect } from 'react'
import { api } from 'course-platform/utils/api'
import type { User } from 'course-platform/utils/types'

type AuthContextActions = { type: 'LOGIN'; user: User } | { type: 'LOGOUT' }

type State = {
  authenticated: null | boolean
  user: null | User
}

type Context = State & {
  login(user: User): void
  logout(): void
}

const AuthContext = createContext<Context>(null!)

type Props = {
  children: React.ReactNode
}

export function AuthProvider({ children }: Props) {
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

  const login = (user: User) => {
    dispatch({ type: 'LOGIN', user })
  }

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
  }

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
  }, [])

  const context: Context = {
    ...state,
    login,
    logout,
  }

  return <AuthContext.Provider value={context} children={children} />
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  // if (!context) {
  //   throw Error('Use of `useAuthContext` is outside of `AuthProvider`')
  // }
  return context || {}
}
