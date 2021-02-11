import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { TaskGroup } from './TaskGroup'
import { Heading } from 'ProjectPlanner/Heading'
import {
  Board as BoardType,
  TaskGroup as TaskGroupType,
  Task as TaskType,
} from 'ProjectPlanner/types'
import { api } from 'ProjectPlanner/api'
// import BoardContext from './BoardContext'
import 'ProjectPlanner/Board.scss'

export const Board: React.FC = () => {
  const boardId = parseInt(useParams<{ boardId: string }>().boardId)
  const [board, setBoard] = useState<BoardType | null>(null)
  const [taskGroups, setTaskGroups] = useState<TaskGroupType[] | null>(null)
  const [tasks, setTasks] = useState<TaskType[] | null>(null)

  useEffect(() => {
    api.boards.getBoard(boardId).then((data) => {
      const { taskGroups, tasks, ...board } = data
      setBoard(board)
      setTaskGroups(taskGroups)
      setTasks(tasks)
    })
  }, [boardId])

  // Lets put these on context:

  const getTask = (taskId: number): TaskType | undefined => {
    return tasks?.find((task) => task.id === taskId)
  }

  const updateTask = (taskId: number, task: TaskType): void => {
    if (!tasks) return
    api.boards.updateTask(taskId, task).then(() => {
      const i = tasks.findIndex((t) => t.id === taskId)
      setTasks([...tasks.slice(0, i), task, ...tasks.slice(i + 1, tasks.length)])
    })
  }

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
