import React, { useContext } from 'react'
import { getTheme } from './utils'

type Colors = {
  [key: string]: string
}
const ThemeContext = React.createContext<Colors | null>(null)

export const ThemeProvider: React.FC = ({ children }) => {
  const colors = getTheme()
  return <ThemeContext.Provider value={colors}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  return useContext(ThemeContext)
}
