import { useState, useEffect } from 'react'
import { api } from '../api'
import { User, Board, TaskGroup, Task } from '../types'

/**
 * These are obnoxiously verbose and repetitive on purpose to demonstrate
 * how things might end up if not using something like useApi (usePromise)
 * or react-query
 */

export const useBoards = (): Board[] | null => {
  const [boards, setBoards] = useState<Board[] | null>(null)

  useEffect(() => {
    let isCurrent = true
    api.boards.getBoards().then((boards) => {
      if (!isCurrent) return
      setBoards(boards)
    })
    return () => {
      isCurrent = false
    }
  }, [])

  return boards
}

export const useBoard = (boardId: number): Board | null => {
  const [board, setBoard] = useState<Board | null>(null)

  useEffect(() => {
    let isCurrent = true
    api.boards.getBoard(boardId).then((board) => {
      if (!isCurrent) return
      setBoard(board)
    })
    return () => {
      isCurrent = false
    }
  }, [boardId])

  return board
}

export const useTaskGroups = (boardId: number): TaskGroup[] | null => {
  const [taskGroups, setTaskGroups] = useState<TaskGroup[] | null>(null)

  useEffect(() => {
    let isCurrent = true
    api.boards.getTaskGroups(boardId).then((taskGroup) => {
      if (!isCurrent) return
      setTaskGroups(taskGroup)
    })
    return () => {
      isCurrent = false
    }
  }, [boardId])

  return taskGroups
}

export const useUser = (userId: number): User | null => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    let isCurrent = true
    api.users.getUser(userId).then((user) => {
      if (!isCurrent) return
      setUser(user)
    })
    return () => {
      isCurrent = false
    }
  }, [userId])

  return user
}

export const useAccountUsers = (): User[] | null => {
  const [users, setUsers] = useState<User[] | null>(null)

  useEffect(() => {
    let isCurrent = true
    api.users.getAccountUsers().then((users) => {
      if (!isCurrent) return
      setUsers(users)
    })
    return () => {
      isCurrent = false
    }
  }, [])

  return users
}
