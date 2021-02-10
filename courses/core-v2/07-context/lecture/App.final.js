import React, { useContext, useRef, useLayoutEffect } from 'react'
import { Heading } from 'ProjectPlanner/Heading'
import { getTheme } from './utils'
import 'ProjectPlanner/styles/global-styles.scss'
import './styles.scss'

/**
 * Custom Provider:
 */

const ThemeContext = React.createContext()

const ThemeProvider = ({ children }) => {
  const colors = getTheme()

  return <ThemeContext.Provider value={colors}>{children}</ThemeContext.Provider>
}

/**
 * App Tree:
 */

export const App = () => {
  return (
    <ThemeProvider>
      <PrimaryLayout />
    </ThemeProvider>
  )
}

const PrimaryLayout = () => {
  return <Board />
}

const Board = () => {
  return <TaskCard />
}

const TaskCard = () => {
  const colors = useContext(ThemeContext)
  const taskRef = useRef()

  useLayoutEffect(() => {
    if (colors) {
      taskRef.current.style.setProperty(`--taskColor`, colors.blue)
    }
  }, [colors])

  return (
    <div className="task-card spacing" ref={taskRef}>
      <Heading>Task Card</Heading>
      <span>{colors.blue}</span>
    </div>
  )
}
