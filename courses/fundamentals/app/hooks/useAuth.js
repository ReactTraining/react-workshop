import { useEffect } from 'react'
import { useAuthState } from '../state/AuthState'
import { getLoggedUser } from '../utils/localStorage'

export default function useAuth() {
  const authState = useAuthState()
  const { authenticated, dispatch } = authState

  useEffect(() => {
    if (!authenticated) {
      const user = getLoggedUser()
      if (user) {
        dispatch({ type: 'LOGIN', user })
      }
    }
  }, [authenticated, dispatch])

  return authState
}
