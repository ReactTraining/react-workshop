import React, { useContext, useRef, useLayoutEffect } from 'react'
import { Heading } from 'ProjectPlanner/Heading'
import { getTheme } from './utils'
import 'ProjectPlanner/styles/global-styles.scss'
import './styles.scss'

type Colors = {
  [key: string]: string
}

const ThemeContext = React.createContext<Colors | null>(null)

export const App: React.FC = () => {
  const colors = getTheme()

  return (
    <ThemeContext.Provider value={colors}>
      <PrimaryLayout />
    </ThemeContext.Provider>
  )
}

const PrimaryLayout: React.FC = () => {
  return <Board />
}

const Board: React.FC = () => {
  return <TaskCard />
}

const TaskCard: React.FC = () => {
  const context = useContext(ThemeContext)
  const spanRef = useRef<HTMLSpanElement>(null!)

  useLayoutEffect(() => {
    if (context) {
      spanRef.current.style.setProperty(`--taskColor`, context.blue)
    }
  }, [context])

  return (
    <div className="task-card spacing">
      <Heading>Task Card</Heading>
      <span ref={spanRef}>
        <b>{context?.blue}</b>
      </span>
    </div>
  )
}
