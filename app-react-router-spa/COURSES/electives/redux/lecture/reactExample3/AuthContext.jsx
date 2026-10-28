import { createContext, use, useEffect, useState } from 'react'
import { api } from '~/utils/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    // Null, meaning not determined yet.
    // False, meaning determined and not logged in
    // True, meaning logged in
    authenticated: null,
    user: null,
  })

  // Determine if the user is already logged in
  useEffect(() => {
    let isCurrent = true
    api.auth.getAuthenticatedUser().then((user) => {
      if (isCurrent) setAuth({ authenticated: !!user, user: user || null })
    })
    return () => {
      isCurrent = false
    }
  }, [])

  async function login(username, password) {
    const user = await api.auth.login(username, password)
    setAuth({ authenticated: true, user })
    return user
  }

  async function logout() {
    await api.auth.logout()
    setAuth({ authenticated: false, user: null })
  }

  return <AuthContext value={{ ...auth, login, logout }}>{children}</AuthContext>
}

export function useAuth() {
  const context = use(AuthContext)
  if (!context) {
    throw Error('Use of `useAuth` is outside of `AuthProvider`')
  }
  return context
}
