import React, { useContext, useRef, useEffect } from 'react'
import { Heading } from 'ProjectPlanner/Heading'
import { getTheme } from './utils'
import 'ProjectPlanner/styles/global-styles.scss'
import './styles.scss'

/**
 * This is JS and not TS on purpose to help explain context
 * without the extra noise TS brings to it.
 */

export const App = () => {
  const colors = getTheme()
  console.log(colors)

  return <PrimaryLayout colors={colors} />
}

const PrimaryLayout = ({ colors }) => {
  return <Board colors={colors} />
}

const Board = ({ colors }) => {
  return <TaskCard colors={colors} />
}

const TaskCard = ({ colors }) => {
  const taskRef = useRef()

  useEffect(() => {
    taskRef.current.style.setProperty(`--taskColor`, colors.blue)
  }, [colors])

  return (
    <div className="task-card spacing" ref={taskRef}>
      <Heading>Task Card</Heading>
      <span>{colors?.blue}</span>
    </div>
  )
}
