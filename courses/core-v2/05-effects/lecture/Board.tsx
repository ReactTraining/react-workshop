import React, { useState } from 'react'
import { Heading } from 'ProjectPlanner/Heading'
// import { TaskDialog } from './TaskDialog'
import { TaskDialog } from './TaskDialog.final'
import { TaskCard } from './TaskCard'
import 'ProjectPlanner/TaskGroup.scss'
import 'ProjectPlanner/Board.scss'

export const Board: React.FC = () => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="board spacing">
      <Heading style={{ minWidth: '25rem' }}>React Workshop</Heading>

      <div className="board-scroll-area">
        <div className="task-group-wrap">
          <div className="task-group spacing">
            {expanded && <TaskDialog onClose={() => setExpanded(false)} />}

            <Heading size={3}>Day One</Heading>
            <div className="spacing">
              <TaskCard onClick={() => setExpanded(true)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
