import * as React from 'react'

const ThemeContext = React.createContext()

export function ThemeProvider({ children }) {
  const context = {}
  return <ThemeContext.Provider value={context} children={children} />
}
