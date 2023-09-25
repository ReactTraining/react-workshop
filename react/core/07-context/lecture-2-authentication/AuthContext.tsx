import { createContext, useContext, useState, useEffect } from 'react'
import { api } from '~/utils/api'
import type { User } from '~/utils/types'

type Context = {
  user: User | null
  authenticated: boolean | null
  login: (user: User) => void
  logout: () => void
}

const AuthContext = createContext<Context>(null!)

type Props = {
  children: React.ReactNode
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null)
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)

  const login = (user: User) => {
    setUser(user)
    setAuthenticated(true)
  }

  const logout = () => {
    setUser(null)
    setAuthenticated(false)
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

  const context = {
    user,
    authenticated,
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
