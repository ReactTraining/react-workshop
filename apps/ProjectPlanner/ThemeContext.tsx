import React, { useState, useContext, createContext } from 'react'

type Colors = {
  [key: string]: string
}

function getRootStyles(props: string[]): Colors {
  return props.reduce((all, property) => {
    return {
      ...all,
      [property]: window.getComputedStyle(document.body).getPropertyValue(`--${property}`).trim(),
    }
  }, {})
}

type ContextType = {
  colors: { [key: string]: string }
}

const Context = createContext<ContextType>(null!)

export const ThemeProvider: React.FC = ({ children }) => {
  const [colors, setColors] = useState<Colors>(null!)

  const context = {
    colors,
  }

  React.useEffect(() => {
    setColors(getRootStyles(['blue', 'brightBlue', 'green', 'purple', 'lavender', 'red', 'yellow']))
  }, [])

  return <Context.Provider value={context} children={children} />
}

export const useTheme = () => {
  return useContext(Context)
}
