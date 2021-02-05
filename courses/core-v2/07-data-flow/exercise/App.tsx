import React, { useContext, useRef, useLayoutEffect } from 'react'
import { Heading } from 'ProjectPlanner/Heading'
import { getTheme } from './utils'
import 'ProjectPlanner/styles/global-styles.scss'
import './styles.scss'

type Props = {
  colors: { [key: string]: string }
}

/**
 * A small React tree: App -> PrimaryLayout -> Board -> TaskCard
 */

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
  const spanRef = useRef<HTMLSpanElement>(null!)

  useLayoutEffect(() => {
    spanRef.current.style.setProperty(`--taskColor`, colors.blue)
  }, [colors])

  return (
    <div className="task-card spacing">
      <Heading>Task Card</Heading>
      <span ref={spanRef}>
        <b>{colors?.blue}</b>
      </span>
    </div>
  )
}
