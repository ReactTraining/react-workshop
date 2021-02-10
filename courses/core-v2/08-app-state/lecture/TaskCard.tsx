import React from 'react'
import { Heading } from 'ProjectPlanner/Heading'
import { useTask } from './useTask'
import { Task } from 'ProjectPlanner/types'
import { TaskColor } from 'ProjectPlanner/TaskColor'
import 'ProjectPlanner/TaskCard.scss'

type Props = {
  taskId: number
  onClick(): void
  // tasks: Task[] | null
}

export const TaskCard: React.FC<Props> = ({ taskId, onClick }) => {
  const [task] = useTask(taskId)

  return (
    <TaskColor task={task}>
      <div
        onClick={() => {
          onClick()
        }}
        className="task-card"
      >
        <div className="task-card-content spacing-small">
          <Heading size={3}>{task?.name}</Heading>
          <div className="task-card-content">{task?.content || <i>No Content</i>}</div>
        </div>
      </div>
    </TaskColor>
  )
}
