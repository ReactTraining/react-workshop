import React, { useContext } from 'react'
import { Heading } from 'ProjectPlanner/Heading'
import 'ProjectPlanner/TaskCard.scss'

// Don't forget to import BoardContext to use with useContext()
// Also don't forget to export that variable from Board.js

// import { BoardContext } from './Board'

export const TaskCard = ({ taskId }) => {
  // Get the `getTask` from from context and call it with
  // the `taskId`. Then replace this empty task object with
  // the real task
  const task = {}

  return (
    <div className="task-card">
      <div className="task-card-content spacing-small">
        <Heading size={3}>{task?.name}</Heading>
        <div className="task-card-content">
          {task?.content || <i>Get Task Data from Database</i>}
        </div>
      </div>
    </div>
  )
}
