import React, { useContext } from 'react'

const AppStateContext = React.createContext()

export function AppStateProvider({ children }) {
  const value = {
    authenticated: true,
  }

  return <AppStateContext.Provider value={value} children={children} />
}

export function useAppState() {
  return useContext(AppStateContext)
}
