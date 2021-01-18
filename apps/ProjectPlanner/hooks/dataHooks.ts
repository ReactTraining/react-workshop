import { useState, useEffect } from 'react'
import api from 'ProjectPlanner/api'
import {
  // TaskGroup as TaskGroupType,
  Board as BoardType,
  Task as TaskType,
} from 'ProjectPlanner/types'

export const useBoards = (
  userId: number
): [BoardType[] | null, React.Dispatch<React.SetStateAction<BoardType[] | null>>] => {
  const [boards, setBoards] = useState<BoardType[] | null>(null)

  useEffect(() => {
    api.boards.getBoards(userId).then((boards: BoardType[]) => {
      setBoards(boards)
    })
  }, [userId])

  return [boards, setBoards]
}

export const useBoard = (
  boardId: number
): [BoardType | null, React.Dispatch<React.SetStateAction<BoardType | null>>] => {
  const [board, setBoard] = useState<BoardType | null>(null)

  useEffect(() => {
    api.boards.getBoard(boardId).then((board: BoardType) => {
      setBoard(board)
    })
  }, [boardId])

  return [board, setBoard]
}

// export const useTaskGroups = (
//   boardId: number
// ): [TaskGroupType | null, React.Dispatch<React.SetStateAction<TaskGroupType | null>>] => {
//   const [taskGroup, setTaskGroup] = useState<TaskGroupType | null>(null)

//   useEffect(() => {
//     api.boards.getBoard(boardId).then((taskGroup: TaskGroupType) => {
//       setTaskGroup(taskGroup)
//     })
//   }, [boardId])

//   return [taskGroup, setTaskGroup]
// }

export const useTasks = (
  boardId: number
): [TaskType[] | null, React.Dispatch<React.SetStateAction<TaskType[] | null>>] => {
  const [tasks, setTasks] = useState<TaskType[] | null>(null)

  useEffect(() => {
    api.boards.getTasks(boardId).then((tasks: TaskType[]) => {
      setTasks(tasks)
    })
  }, [boardId])

  return [tasks, setTasks]
}

// const taskGroups = board?.taskGroups
