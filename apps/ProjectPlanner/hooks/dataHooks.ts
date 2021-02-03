import { useState, useEffect } from 'react'
import { api } from '../api'
import { TaskGroup as TaskGroupType, Board as BoardType, Task as TaskType } from '../types'

export const useBoards = (userId: number | undefined): BoardType[] | null => {
  const [boards, setBoards] = useState<BoardType[] | null>(null)

  useEffect(() => {
    if (!userId) return
    api.boards.getBoards(userId).then((boards: BoardType[]) => {
      setBoards(boards)
    })
  }, [userId])

  return boards
}

export const useBoard = (boardId: number): BoardType | null => {
  const [board, setBoard] = useState<BoardType | null>(null)

  useEffect(() => {
    api.boards.getBoard(boardId).then((board: BoardType) => {
      setBoard(board)
    })
  }, [boardId])

  return board
}

export const useTaskGroups = (boardId: number): TaskGroupType[] | null => {
  const [taskGroups, setTaskGroups] = useState<TaskGroupType[] | null>(null)

  useEffect(() => {
    api.boards.getTaskGroups(boardId).then((taskGroup: TaskGroupType[]) => {
      setTaskGroups(taskGroup)
    })
  }, [boardId])

  return taskGroups
}

// export const useTasks = (boardId: number): TaskType[] | null => {
//   const [tasks, setTasks] = useState<TaskType[] | null>(null)

//   useEffect(() => {
//     api.boards.getTasks(boardId).then((tasks: TaskType[]) => {
//       setTasks(tasks)
//     })
//   }, [boardId])

//   return tasks
// }
