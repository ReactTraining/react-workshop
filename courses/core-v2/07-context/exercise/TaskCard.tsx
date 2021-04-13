import React, { useContext, useRef, useEffect } from 'react'
import { Heading } from 'ProjectPlanner/Heading'
import { Task } from './index'
// import { TaskColor } from './TaskColor'
import 'ProjectPlanner/TaskCard.scss'

// We'll only need to import ThemeContext until we make a custom provider
import { ThemeContext } from './index'
// Then we can import useTheme
// import { useTheme } from './ThemeContext'

type Props = {
  onClick(): void
  task: Task
}

export const TaskCard: React.FC<Props> = ({ task, onClick }) => {
  const colors = useContext(ThemeContext)
  const divRef = useRef<HTMLDivElement>(null!)

  React.useEffect(() => {
    if (colors) {
      let statusColor: string | null = null
      if (task) {
        if (task.completedMinutes === 0) {
          statusColor = colors.red
        } else if (task.completedMinutes >= task.minutes) {
          statusColor = colors.green
        } else {
          statusColor = colors.blue
        }
      }
      divRef.current.style.setProperty(`--taskColor`, statusColor)
    }
  }, [colors, task])

  return (
    <div
      onClick={() => {
        onClick()
      }}
      className="task-card"
      ref={divRef}
    >
      <div className="task-card-content spacing-small">
        <Heading size={3}>{task.name}</Heading>
        <div className="task-card-content">{task.content}</div>
      </div>
    </div>
  )
}
