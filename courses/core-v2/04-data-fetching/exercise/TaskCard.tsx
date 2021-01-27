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
  // Do Effect Here

  return (
    <div
      onClick={() => {
        onClick()
      }}
      className="task-card"
    >
      <div className="task-card-content spacing-small">
        <Heading size={3}>Task Name</Heading>
        <div className="task-card-content">Task Content</div>
      </div>
    </div>
  )
}
