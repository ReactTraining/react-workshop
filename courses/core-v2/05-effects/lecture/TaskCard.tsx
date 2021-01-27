import React from 'react'
import { format, parse } from 'date-fns'
import { FaCalendar } from 'react-icons/fa'
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
    task && (
      <div
        onClick={() => {
          onClick()
        }}
        className="task-card"
      >
        <div className="task-card-content spacing-small">
          {task && <Heading size={3}>{task.name}</Heading>}
          <div className="task-card-content">{task.content ? <i>No Content</i> : task.content}</div>
        </div>
      </div>
    )
  )
}
