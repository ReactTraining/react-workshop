import React, { useContext, createContext } from 'react'
import { getTheme } from './utils'

type Colors = {
  [key: string]: string
}

type ContextType = {
  colors: { [key: string]: string }
}

const ThemeContext = createContext<ContextType>(null!)

export const ThemeProvider: React.FC = ({ children }) => {
  const colors: Colors = getTheme()
  return <ThemeContext.Provider value={{ colors }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  return useContext(ThemeContext)
}
