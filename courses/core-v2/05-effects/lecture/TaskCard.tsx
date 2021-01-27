import React from 'react'
import { Heading } from 'ProjectPlanner/Heading'
import 'ProjectPlanner/TaskCard.scss'

type Props = {
  onClick(): void
}

export const TaskCard: React.FC<Props> = ({ onClick }) => {
  return (
    <div
      onClick={() => {
        onClick()
      }}
      className="task-card"
    >
      <div className="task-card-content spacing-small">
        <Heading size={3}>Learn useEffect</Heading>
        <div className="task-card-content">It's a "hook"</div>
      </div>
    </div>
  )
}
