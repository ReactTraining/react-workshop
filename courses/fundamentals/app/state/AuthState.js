import React, { useContext, useReducer, useEffect } from 'react'

const AuthStateContext = React.createContext()

const initialState = {
  authenticated: false,
  user: {},
}

const LOCAL_STORAGE_KEY = 'reacttraining-workshop-auth'

export function AuthStateProvider({ children }) {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'LOGIN': {
        const { username, name, avatarUrl } = action
        return { ...state, authenticated: true, user: { username, name, avatarUrl } }
      }
      case 'LOGOUT': {
        return initialState
      }
      default:
        return state
    }
  }, initialState)

  const value = {
    ...state,
    setAuthenticatedUser(username, name, avatarUrl) {
      dispatch({ type: 'LOGIN', username, name, avatarUrl })
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ username, name, avatarUrl }))
    },
    removeAuthenticatedUser() {
      dispatch({ type: 'LOGOUT' })
      localStorage.setItem(LOCAL_STORAGE_KEY, null)
    },
  }

  return <AuthStateContext.Provider value={value} children={children} />
}

export function useAuthState() {
  const authState = useContext(AuthStateContext)

  useEffect(() => {
    if (!authState.user.username) {
      const localStorageUser = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (!localStorageUser) return
      try {
        const { username, name, avatarUrl } = JSON.parse(localStorageUser)
        authState.setAuthenticatedUser(username, name, avatarUrl)
      } catch (e) {
        return
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return authState
}
