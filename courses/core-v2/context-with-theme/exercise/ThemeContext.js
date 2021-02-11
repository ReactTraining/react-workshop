import React, { useContext, createContext } from 'react'
import { getTheme } from './utils'

// You'll only these these type aliases if you change to TypeScript:
// type Colors = {
//   [key: string]: string
// }

// type ContextType = {
//   colors: { [key: string]: string }
// }

/**
 * 1. Create the Context Object with `React.createContext`.
 * 2. Create a provider and wrap it around the `children`.
 *    Also pass down context through the `value` prop of the provider.
 * 3. Create a custom hook that uses `useContext` to consume context
 */

// 1:
// const ThemeContext = ???

export const ThemeProvider = ({ children }) => {
  const colors = getTheme()

  // 2:
  return children
}

// 3:
export const useTheme = () => {
  return { colors: {} }
}
