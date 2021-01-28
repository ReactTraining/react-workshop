import React, { useEffect, useState } from 'react'
import { Heading } from 'ProjectPlanner/Heading'
// import { useTask } from './useTask'
import 'ProjectPlanner/TaskCard.scss'

type Props = {
  taskId: number
  onClick(): void
}

export const TaskCard: React.FC<Props> = ({ taskId, onClick }) => {
  // Do effect here to get task based on taskId

  // Use the `task.name` and `task.content` in the appropriate place below.
  // But remember, you can't just use `task.name` if task is null or
  // undefined, so you'll have to handle that situation.

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
