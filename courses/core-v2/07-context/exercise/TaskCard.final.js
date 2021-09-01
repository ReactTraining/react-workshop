import React, { useContext } from 'react'
import { Heading } from 'ProjectPlanner/Heading'
import 'ProjectPlanner/TaskCard.scss'
import { BoardContext } from './Board.final'

export const TaskCard = ({ taskId }) => {
  const { getTask } = useContext(BoardContext)
  const task = getTask(taskId)

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
