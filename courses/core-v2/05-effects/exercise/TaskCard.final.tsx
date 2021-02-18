import React, { useRef, useEffect } from 'react'
import { Heading } from 'ProjectPlanner/Heading'
import 'ProjectPlanner/styles/global-styles.scss'
import './styles.scss'

const colors = {
  red: '#ff5656',
  green: '#4dd579',
  blue: '#04b3ff',
}

export const TaskCard: React.FC<{ color: string }> = ({ color }) => {
  return (
    <TaskColor color={color}>
      <div className="task-card spacing">
        <Heading>Task Card</Heading>
        {color && <span>{colors[color]}</span>}
      </div>
    </TaskColor>
  )
}

const TaskColor: React.FC<{ color: string }> = ({ children, color }) => {
  const taskRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (color) {
      taskRef.current.style.setProperty(`--taskColor`, colors[color])
    }
  }, [color])

  return <div ref={taskRef}>{children}</div>
}
