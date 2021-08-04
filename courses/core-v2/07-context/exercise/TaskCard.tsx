import React, { useContext } from 'react'
import { Heading } from 'ProjectPlanner/Heading'
import { Task } from './index'
import 'ProjectPlanner/TaskCard.scss'

// This is for Task: 1
// We'll only need to import ThemeContext until we make a custom provider
import { ThemeContext } from './index'
// Then we can import useTheme
// import { useTheme } from './ThemeContext'

// This is for Task: 2
// import { useTaskColor } from './useTaskColor'

type Props = {
  onClick(): void
  task: Task
}

export const TaskCard: React.FC<Props> = ({ task, onClick }) => {
  // For Task: 2
  // Put all of this into a custom hook called useTaskColor //////
  const colors = useContext(ThemeContext)
  let taskColor = ''

  if (colors && task) {
    if (task.completedMinutes === 0) {
      taskColor = colors.red
    } else if (task.completedMinutes >= task.minutes) {
      taskColor = colors.green
    } else {
      taskColor = colors.blue
    }
  }
  ////////////////////////////////////////////////////////////////

  return (
    <div
      onClick={() => {
        onClick()
      }}
      className="task-card"
      style={{ '--taskColor': taskColor }}
    >
      <div className="task-card-content spacing-small">
        <Heading size={3}>{task.name}</Heading>
        <div className="task-card-content">{task.content}</div>
      </div>
    </div>
  )
}
