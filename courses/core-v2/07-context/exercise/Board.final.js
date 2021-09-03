import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { TaskGroup } from './TaskGroup'
import { Heading } from 'ProjectPlanner/Heading'
import { api } from 'ProjectPlanner/api'
import 'ProjectPlanner/Board.scss'

export const BoardContext = React.createContext()

export const Board = () => {
  const boardId = parseInt(useParams().boardId)
  const [board, setBoard] = useState(null)
  const [taskGroups, setTaskGroups] = useState(null)
  const [tasks, setTasks] = useState(null)

  useEffect(() => {
    api.boards.getBoard(boardId).then((data) => {
      const { taskGroups, tasks, ...board } = data
      setBoard(board)
      setTaskGroups(taskGroups)
      setTasks(tasks)
    })
  }, [boardId])

  const getTask = (taskId) => {
    return tasks?.find((task) => task.id === taskId)
  }

  const context = {
    getTask,
  }

  return (
    <BoardContext.Provider value={context}>
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
    </BoardContext.Provider>
  )
}
