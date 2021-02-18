import React, { useContext, useRef, useEffect } from 'react'
import { Heading } from 'ProjectPlanner/Heading'
import { getTheme } from './utils'
import 'ProjectPlanner/styles/global-styles.scss'
import './styles.scss'

type Colors = {
  [key: string]: string
}

/**
 * Custom Provider:
 */

const ThemeContext = React.createContext<Colors | null>(null)

const ThemeProvider: React.FC = ({ children }) => {
  const colors = getTheme()

  return <ThemeContext.Provider value={colors}>{children}</ThemeContext.Provider>
}

/**
 * App Tree:
 */

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <PrimaryLayout />
    </ThemeProvider>
  )
}

const PrimaryLayout: React.FC = () => {
  return <Board />
}

const Board: React.FC = () => {
  return <TaskCard />
}

const TaskCard: React.FC = () => {
  const colors = useContext(ThemeContext)
  const taskRef = useRef<HTMLDivElement>(null!)

  useEffect(() => {
    if (colors) {
      taskRef.current.style.setProperty(`--taskColor`, colors.blue)
    }
  }, [colors])

  return (
    <div className="task-card spacing" ref={taskRef}>
      <Heading>Task Card</Heading>
      <span>{colors?.blue}</span>
    </div>
  )
}
