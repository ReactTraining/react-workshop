import React, { useContext, createContext } from 'react'

type Colors = {
  [key: string]: string
}

type ContextType = {
  colors: { [key: string]: string }
}

const Context = createContext<ContextType>(null!)

export const ThemeProvider: React.FC = ({ children }) => {
  const colors: Colors = getRootStyles([
    'blue',
    'brightBlue',
    'green',
    'purple',
    'lavender',
    'red',
    'yellow',
  ])
  return <Context.Provider value={{ colors }} children={children} />
}

export const useTheme = () => {
  return useContext(Context)
}

/**
 * Utility
 */

function getRootStyles(colors: string[]): Colors {
  return colors.reduce((all, property) => {
    return {
      ...all,
      [property]: window.getComputedStyle(document.body).getPropertyValue(`--${property}`).trim(),
    }
  }, {})
}
