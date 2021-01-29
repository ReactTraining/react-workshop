import React, { useContext } from 'react'
import {
  Board as BoardType,
  TaskGroup as TaskGroupType,
  Task as TaskType,
} from 'ProjectPlanner/types'
import { useBoard, useTaskGroups, useTasks } from 'ProjectPlanner/hooks/dataHooks'
import api from 'ProjectPlanner/api'

type Props = {
  boardId: number
}

type BoardContextType = {
  board: BoardType | null
  taskGroups: TaskGroupType[] | null
  tasks: TaskType[] | null

  updateBoardName: (name: string) => void
  createTaskGroup: () => void
  updateTaskGroupName: (taskGroupId: number, name: string) => void
  removeTaskGroup: (taskGroupId: number) => void
  getTask: (taskId: number) => TaskType | undefined
  updateTask: (taskId: number, task: TaskType) => void
  createTask: (taskGroupId: number) => void
  removeTask: (taskId: number) => void
}

const BoardContext = React.createContext<BoardContextType>(null!)

export const BoardProvider: React.FC<Props> = ({ boardId, children }) => {
  const [board, setBoard] = useBoard(boardId)
  const [taskGroups, setTaskGroups] = useTaskGroups(boardId)
  const [tasks, setTasks] = useTasks(boardId)

  const context: BoardContextType = {
    board,
    taskGroups,
    tasks,

    updateBoardName: (name) => {
      if (!board) return
      const newBoard = {
        ...board,
        name,
      }
      setBoard(newBoard)
      api.boards.updateBoard(boardId, newBoard)
    },
    createTaskGroup: () => {
      if (!taskGroups) return
      api.boards.createTaskGroup(boardId).then((newTaskGroup) => {
        setTaskGroups(taskGroups.concat(newTaskGroup))
      })
    },
    updateTaskGroupName: async (taskGroupId, name) => {
      if (!board || !taskGroups) return

      const newTaskGroups = taskGroups.map((taskGroup) => {
        return taskGroup.id !== taskGroupId ? taskGroup : { ...taskGroup, name }
      })

      setTaskGroups(newTaskGroups)
      api.boards.updateTaskGroups(newTaskGroups)
    },
    removeTaskGroup: async (taskGroupId) => {
      if (!taskGroups || !tasks) return
      const relatedTaskIds = taskGroups.find((t) => t.id === taskGroupId)?.taskIds || []
      await api.boards.removeTaskGroup(taskGroupId, relatedTaskIds)
      setTaskGroups(taskGroups.filter((t) => t.id !== taskGroupId))
      setTasks(tasks.filter((t) => !relatedTaskIds.includes(t.id)))
    },
    getTask: (taskId) => {
      return tasks?.find((t: TaskType) => t.id === taskId)
    },
    updateTask: (taskId, task) => {
      api.boards.updateTask(taskId, task).then(() => {
        if (!tasks) return
        const i = tasks.findIndex((t) => t.id === taskId)
        setTasks([...tasks.slice(0, i), task, ...tasks.slice(i, tasks.length)])
      })
    },
    createTask: async (taskGroupId) => {
      if (!board || !taskGroups || !tasks) return

      // Add Task
      const task: TaskType = await api.boards.createTask(boardId)
      setTasks(tasks.concat([task]))

      // Add to Task Group
      const newTaskGroups = taskGroups.map((taskGroup) => {
        return taskGroup.id !== taskGroupId
          ? taskGroup
          : { ...taskGroup, taskIds: taskGroup.taskIds.concat([task.id]) }
      })

      setTaskGroups(newTaskGroups)
      api.boards.updateTaskGroups(newTaskGroups)
    },
    removeTask: async (taskId) => {
      if (!board || !tasks || !taskGroups) return

      // Remove Task
      await api.boards.removeTask(taskId)
      setTasks(tasks.filter((task) => task.id !== taskId))

      // Remove Task from Group
      const newTaskGroups = taskGroups.map((taskGroup) => {
        return { ...taskGroup, taskIds: taskGroup.taskIds.filter((id) => id !== taskId) }
      })

      setTaskGroups(newTaskGroups)
      await api.boards.updateTaskGroups(newTaskGroups)
    },
  }

  return <BoardContext.Provider children={children} value={context} />
}

export const useBoardContext = () => {
  return useContext(BoardContext)
}
