import React, { useContext } from 'react'
import { getTheme } from './utils'

// Create context here

export const ThemeProvider: React.FC = ({ children }) => {
  // Wrap the children in the provider
  return null
}

export const useTheme = () => {
  // Temporary until you implement useContext
  return { red: '', green: '', blue: '' }
}
