import * as React from 'react'
import type { UserType } from '~/utils/db.server'

type ContextType = {
  user: UserType | undefined
}

type Props = {
  children: React.ReactNode
  user: UserType | undefined
}

const Context = React.createContext<ContextType>(null!)

export function AuthProvider({ children, user }: Props) {
  const context: ContextType = { user }
  return <Context.Provider value={context} children={children} />
}

export function useAuth() {
  const context = React.useContext(Context)
  if (!context) {
    throw Error('Using useAuth without an AuthProvider')
  }
  return context || {}
}
