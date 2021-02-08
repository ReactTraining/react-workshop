import React, { useContext, useRef, useLayoutEffect } from 'react'
import { Heading } from 'ProjectPlanner/Heading'
import { getTheme } from './utils'
import 'ProjectPlanner/styles/global-styles.scss'
import './styles.scss'

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
