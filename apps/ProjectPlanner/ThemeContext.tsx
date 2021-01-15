import React, { useContext, createContext } from 'react'

const colors: { [key: string]: string } = {
  blue: '#6fbfd8',
  brightBlue: '#04b3ff',
  // green: '#50f3b0',
  green: '#4dd579',
  purple: '#696ad8',
  lavender: '#c3a2f9',
  red: '#ff5656',
  yellow: '#f3b73d',
}

type ContextType = {
  colors: { [key: string]: string }
}

const Context = createContext<ContextType>(null!)

export const ThemeProvider: React.FC = ({ children }) => {
  const context = {
    colors,
  }

  return <Context.Provider value={context} children={children} />
}

export const useTheme = () => {
  return useContext(Context)
}
