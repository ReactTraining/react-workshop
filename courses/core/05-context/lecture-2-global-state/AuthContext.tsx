import { createContext, useContext, useState, useEffect } from 'react'
import { api } from 'course-platform/utils/api'
import type { User } from 'course-platform/utils/types'

type Context = {
  authenticated: boolean | null
  user: User | null
  login(user: User): void
  logout(): void
}

const AuthContext = createContext<Context>(null!)

export const AuthProvider: React.FC = ({ children }) => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)
  const [user, setUser] = useState<User | null>(null)

  const login = (user: User) => {
    setAuthenticated(true)
    setUser(user)
  }

  const logout = () => {
    setAuthenticated(false)
    setUser(null)
  }

  useEffect(() => {
    let isCurrent = true
    api.auth.getAuthenticatedUser().then((user: User) => {
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
    authenticated,
    user,
    login,
    logout,
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
