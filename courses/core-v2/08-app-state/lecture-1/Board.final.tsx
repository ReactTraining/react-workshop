import React from 'react'
import { useParams } from 'react-router-dom'
import { TaskGroup } from './TaskGroup'
import { Heading } from 'ProjectPlanner/Heading'
import { BoardProvider, useBoardContext } from './BoardContext'
import 'ProjectPlanner/Board.scss'

export const Board: React.FC = () => {
  const boardId = parseInt(useParams<{ boardId: string }>().boardId)

  return (
    <BoardProvider boardId={boardId}>
      <BoardUI />
    </BoardProvider>
  )
}

export const BoardUI: React.FC = () => {
  const { board, taskGroups } = useBoardContext()

  return (
    <div className="board spacing">
      <Heading style={{ minWidth: '25rem' }}>{board?.name}</Heading>

      <div className="board-scroll-area">
        {taskGroups &&
          taskGroups.map((taskGroup) => {
            return (
              <div className="task-group-wrap" key={taskGroup.id}>
                <TaskGroup name={taskGroup.name} taskIds={taskGroup.taskIds} />
              </div>
            )
          })}
      </div>
    </div>
  )
}
