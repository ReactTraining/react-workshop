import { useCallback } from 'react'
import { UserNoPassword } from 'YesterTech/types'
import { useSelector, useDispatch } from './store.final'

function getInitialState(): AuthState {
  return {
    authenticated: false,
    user: null,
  }
}

export function authReducer(state: AuthState = getInitialState(), action: AuthActions): AuthState {
  switch (action.type) {
    case 'auth/LOGIN': {
      return { ...state, authenticated: true, user: action.user }
    }
    case 'auth/LOGOUT': {
      return getInitialState()
    }
    default:
      return state
  }
}

export function useAuthDispatch() {
  const dispatch = useDispatch()
  return useCallback(
    (action: LocalAuthActions) => {
      return dispatch({ ...action, type: `auth/${action.type}` } as AuthActions)
    },
    [dispatch]
  )
}

export function useAuthState(): AuthState {
  return useSelector((state) => state.auth)
}

export interface AuthState {
  authenticated: boolean
  user: null | UserNoPassword
}

type LocalAuthActions =
  | {
      type: 'LOGIN'
      user: UserNoPassword
    }
  | {
      type: 'LOGOUT'
    }

type MappedRootAction<P extends string, T> = T extends { type: string }
  ? { type: `${P}/${T['type']}` } & Omit<T, 'type'>
  : never
type AuthActions = MappedRootAction<'auth', LocalAuthActions>
