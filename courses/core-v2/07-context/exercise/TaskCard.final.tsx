import React from 'react'
import { Heading } from 'ProjectPlanner/Heading'
import { Task } from './index'
import { useTaskColor } from './useTaskColor'
import 'ProjectPlanner/TaskCard.scss'

type Props = {
  onClick(): void
  task: Task
}

export const TaskCard: React.FC<Props> = ({ task, onClick }) => {
  const taskColor = useTaskColor(task)

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
