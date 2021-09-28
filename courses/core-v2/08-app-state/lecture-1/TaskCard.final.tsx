import React from 'react'
import { Heading } from 'ProjectPlanner/Heading'
import { TaskColor } from 'ProjectPlanner/TaskColor'
import { useBoardContext } from './BoardContext'
import 'ProjectPlanner/TaskCard.scss'

type Props = {
  taskId: number
  onClick(): void
}

export const TaskCard: React.FC<Props> = ({ taskId, onClick }) => {
  const { getTask } = useBoardContext()
  const task = getTask(taskId)

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
