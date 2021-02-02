import React, { useEffect, useState } from 'react'
import { Heading } from 'ProjectPlanner/Heading'
import { Task } from 'ProjectPlanner/types'
// import { useTask } from './useTask'
import 'ProjectPlanner/TaskCard.scss'

type Props = {
  taskId: number
  onClick(): void
}

export const TaskCard: React.FC<Props> = ({ taskId, onClick }) => {
  const [task, setTask] = useState<Task | null>(null)

  // Do effect here to get task based on taskId
  // You'll want to store the response in the `task` state above

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
