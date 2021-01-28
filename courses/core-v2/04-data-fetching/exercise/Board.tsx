import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { TaskGroup } from './TaskGroup'
import { Heading } from 'ProjectPlanner/Heading'
import { Board as BoardType, TaskGroup as TaskGroupType } from 'ProjectPlanner/types'
import { api } from 'ProjectPlanner/api2'
import 'ProjectPlanner/Board.scss'

export const Board: React.FC = () => {
  const boardId = parseInt(useParams<{ boardId: string }>().boardId)
  const [board, setBoard] = useState<BoardType | null>(null)
  const [taskGroups, setTaskGroups] = useState<TaskGroupType[] | null>(null)

  useEffect(() => {
    let isCurrent = true
    api.boards.getBoard(boardId).then((board) => {
      if (isCurrent) setBoard(board)
    })
    return () => {
      isCurrent = false
    }
  }, [boardId])

  useEffect(() => {
    let isCurrent = true
    api.boards.getTaskGroups(boardId).then((taskGroups) => {
      if (isCurrent) setTaskGroups(taskGroups)
    })
    return () => {
      isCurrent = false
    }
  }, [boardId])

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
