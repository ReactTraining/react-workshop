import React from 'react'
import { Heading } from 'ProjectPlanner/Heading'
import { Task } from './index'
import { TaskColor } from './TaskColor'
import 'ProjectPlanner/TaskCard.scss'

type Props = {
  onClick(): void
  task: Task
}

export const TaskCard: React.FC<Props> = ({ task, onClick }) => {
  return (
    <TaskColor task={task}>
      <div
        onClick={() => {
          onClick()
        }}
        className="task-card"
      >
        <div className="task-card-content spacing-small">
          <Heading size={3}>{task.name}</Heading>
          <div className="task-card-content">{task.content}</div>
        </div>
      </div>
    </TaskColor>
  )
}
