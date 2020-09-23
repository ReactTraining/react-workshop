import React, { useContext } from 'react'
import useMedia from './useMedia'

const ThemeContext = React.createContext()

export function ThemeProvider({ children }) {
  const dark = useMedia('(prefers-color-scheme: dark)')

  const context = {
    scheme: dark ? 'dark' : 'light'
  }

  return <ThemeContext.Provider value={context} children={children} />
}

export function useTheme() {
  return useContext(ThemeContext)
}
