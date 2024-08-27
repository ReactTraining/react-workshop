import { createContext, use, useState, useEffect } from 'react'
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
    api.auth.getAuthenticatedUser().then((user) => {
      if (user) {
        login(user)
      } else {
        logout()
      }
    })
  }, [])

  const context = {
    user,
    authenticated,
    login,
    logout,
  }

  return <AuthContext value={context} children={children} />
}

export function useAuthContext() {
  const context = use(AuthContext)
  if (!context) {
    throw Error('Use of `useAuthContext` is outside of `AuthProvider`')
  }
  return context || {}
}

const { user, authenticated } = useAuthContext()
