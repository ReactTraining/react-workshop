import { useState, useEffect } from 'react'
import { api } from '../api'
import { User, Board, TaskGroup, Task } from '../types'

/**
 * These are temporary until we make usePromise
 */

export const useBoards = (userId: number | undefined): Board[] | null => {
  const [boards, setBoards] = useState<Board[] | null>(null)

  useEffect(() => {
    if (!userId) return
    api.boards.getBoards(userId).then((boards) => {
      setBoards(boards)
    })
  }, [userId])

  return boards
}

export const useBoard = (boardId: number): Board | null => {
  const [board, setBoard] = useState<Board | null>(null)

  useEffect(() => {
    api.boards.getBoard(boardId).then((board) => {
      setBoard(board)
    })
  }, [boardId])

  return board
}

export const useTaskGroups = (boardId: number): TaskGroup[] | null => {
  const [taskGroups, setTaskGroups] = useState<TaskGroup[] | null>(null)

  useEffect(() => {
    api.boards.getTaskGroups(boardId).then((taskGroup) => {
      setTaskGroups(taskGroup)
    })
  }, [boardId])

  return taskGroups
}

// export const useTask = (taskId: number): Task | null => {
//   const [task, setTask] = useState<Task | null>(null)

//   useEffect(() => {
//     api.boards.getTask(taskId).then((task) => {
//       setTask(task)
//     })
//   }, [taskId])

//   return task
// }

export const useAccountUsers = (accountId: number | undefined): User[] | null => {
  const [users, setUsers] = useState<User[] | null>(null)

  useEffect(() => {
    if (!accountId) return
    api.users.getAccountUsers(accountId).then((users) => {
      setUsers(users)
    })
  }, [accountId])

  return users
}
