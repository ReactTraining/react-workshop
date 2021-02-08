import React, { useContext, createContext } from 'react'
import { getTheme } from './utils'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const colors = getTheme()
  return <ThemeContext.Provider value={{ colors }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  return useContext(ThemeContext)
}
