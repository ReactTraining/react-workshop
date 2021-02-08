import React, { useContext, useRef, useLayoutEffect } from 'react'
import { Heading } from 'ProjectPlanner/Heading'
import { getTheme } from './utils'
import 'ProjectPlanner/styles/global-styles.scss'
import './styles.scss'

type Props = {
  colors: { [key: string]: string }
}

export const App: React.FC = () => {
  // Open getTheme to see where these are coming from!
  const colors = getTheme()

  console.log(colors)

  return <PrimaryLayout colors={colors} />
}

const PrimaryLayout: React.FC<Props> = ({ colors }) => {
  return <Board colors={colors} />
}

const Board: React.FC<Props> = ({ colors }) => {
  return <TaskCard colors={colors} />
}

const TaskCard: React.FC<Props> = ({ colors }) => {
  const taskRef = useRef<HTMLDivElement>(null!)

  useLayoutEffect(() => {
    taskRef.current.style.setProperty(`--taskColor`, colors.blue)
  }, [colors])

  return (
    <div className="task-card spacing" ref={taskRef}>
      <Heading>Task Card</Heading>
      <span>{colors?.blue}</span>
    </div>
  )
}
