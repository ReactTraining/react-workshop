import React, { useContext } from 'react'
import { Heading } from 'ProjectPlanner/Heading'
import { useTask } from './useTask'
import 'ProjectPlanner/TaskCard.scss'

type Props = {
  taskId: number
  onClick(): void
}

export const TaskCard: React.FC<Props> = ({ taskId, onClick }) => {
  const [task] = useTask(taskId)

  return (
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
  )
}
