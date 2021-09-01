import React, { useState } from 'react'
import { Heading } from 'ProjectPlanner/Heading'
import { TaskCard } from './TaskCard'
import 'ProjectPlanner/TaskGroup.scss'

export const TaskGroup = ({ name, taskIds }) => {
  return (
    <div className="task-group spacing">
      <Heading size={3}>{name}</Heading>

      <div className="spacing">
        {Array.isArray(taskIds) &&
          taskIds.map((taskId) => {
            return <TaskCard key={taskId} taskId={taskId} />
          })}
      </div>
    </div>
  )
}
