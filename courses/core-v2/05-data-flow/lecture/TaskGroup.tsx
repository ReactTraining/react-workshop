import React, { useState } from 'react'
import { Heading } from 'ProjectPlanner/Heading'
import { TaskDialog } from './TaskDialog'
import { TaskCard } from './TaskCard'
import 'ProjectPlanner/TaskGroup.scss'

type Props = {
  name: string
  taskIds: number[]
}

export const TaskGroup: React.FC<Props> = ({ name, taskIds }) => {
  const [expandTaskId, setExpandTaskId] = useState<number | null>(null)

  return (
    <div className="task-group spacing">
      {expandTaskId && (
        <TaskDialog
          onClose={() => setExpandTaskId(null)}
          taskId={expandTaskId}
          siblingTaskIds={taskIds}
          onChangeTaskId={setExpandTaskId}
        />
      )}
      <Heading size={3}>{name}</Heading>

      <div className="spacing">
        {Array.isArray(taskIds) &&
          taskIds.map((taskId) => {
            return <TaskCard key={taskId} taskId={taskId} onClick={() => setExpandTaskId(taskId)} />
          })}
      </div>
    </div>
  )
}
