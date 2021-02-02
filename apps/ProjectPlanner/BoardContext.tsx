import React, { useContext, useEffect, useReducer, useRef, useCallback } from 'react'
import {
  Board as BoardType,
  TaskGroup as TaskGroupType,
  Task as TaskType,
} from 'ProjectPlanner/types'
import { api } from 'ProjectPlanner/api2'

type Props = {
  boardId: number
}

type BoardContextType = {
  board: BoardType | null
  taskGroups: TaskGroupType[] | null
  tasks: TaskType[] | null
  getTask: (taskId: number) => TaskType | undefined
  updateBoardName: (name: string) => void
  createTaskGroup: () => void
  updateTaskGroupName: (taskGroupId: number, name: string) => void
  updateTaskGroups: (taskGroups: TaskGroupType[]) => void
  removeTaskGroup: (taskGroupId: number) => void
  updateTask: (taskId: number, task: TaskType) => void
  createTask: (taskGroupId: number) => void
  removeTask: (taskId: number) => void
}

const BoardContext = React.createContext<BoardContextType>(null!)

type State = {
  current: 'loading' | 'success' | 'error'
  errorMessage: null | string
  board: null | BoardType
  taskGroups: null | TaskGroupType[]
  tasks: null | TaskType[]
}

type Actions =
  | { type: 'LOAD_DATA'; payload: Partial<State> }
  | { type: 'UPDATE_BOARD'; updates: Partial<BoardType> }
  | { type: 'CREATE_TASK_GROUP'; taskGroup: TaskGroupType }
  | { type: 'REMOVE_TASK_GROUP'; taskGroupId: number }
  | { type: 'UPDATE_TASK_GROUP'; taskGroupId: number; updates: Partial<TaskGroupType> }
  | { type: 'UPDATE_TASK_GROUPS'; taskGroups: TaskGroupType[] }
  | { type: 'CREATE_TASK'; taskGroupId: number; task: TaskType }
  | { type: 'UPDATE_TASK'; taskId: number; task: TaskType }
  | { type: 'REMOVE_TASK'; taskId: number }

export const BoardProvider: React.FC<Props> = ({ boardId, children }) => {
  const [state, dispatch] = useReducer(
    (state: State, action: Actions) => {
      switch (action.type) {
        case 'LOAD_DATA': {
          return { ...state, ...action.payload }
        }
        case 'UPDATE_BOARD': {
          if (!state.board) return state
          return { ...state, board: { ...state.board, ...action.updates } }
        }
        case 'CREATE_TASK_GROUP': {
          if (!state.taskGroups) return state
          return { ...state, taskGroups: state.taskGroups.concat(action.taskGroup) }
        }
        case 'REMOVE_TASK_GROUP': {
          if (!state.taskGroups || !state.tasks) return state
          const relatedTaskIds =
            state.taskGroups.find((t) => t.id === action.taskGroupId)?.taskIds || []
          return {
            ...state,
            taskGroups: state.taskGroups.filter((t) => t.id !== action.taskGroupId),
            tasks: state.tasks.filter((t) => !relatedTaskIds.includes(t.id)),
          }
        }
        case 'UPDATE_TASK_GROUP': {
          const { taskGroups } = state
          if (!taskGroups) return state
          const i = taskGroups.findIndex((t) => t.id === action.taskGroupId)
          return {
            ...state,
            taskGroups: [
              ...taskGroups.slice(0, i),
              { ...taskGroups[i], ...action.updates },
              ...taskGroups.slice(i + 1, taskGroups.length),
            ],
          }
        }
        case 'UPDATE_TASK_GROUPS': {
          return { ...state, taskGroups: action.taskGroups }
        }
        case 'CREATE_TASK': {
          const { taskGroups, tasks } = state
          if (!taskGroups || !tasks) return state

          const i = taskGroups.findIndex((t) => t.id === action.taskGroupId)
          const taskGroup = taskGroups[i]
          return {
            ...state,
            tasks: tasks.concat(action.task),
            taskGroups: [
              ...taskGroups.slice(0, i),
              { ...taskGroup, taskIds: taskGroup.taskIds.concat(action.task.id) },
              ...taskGroups.slice(i + 1, taskGroups.length),
            ],
          }
        }
        case 'UPDATE_TASK': {
          const { tasks } = state
          if (!tasks) return state
          const i = tasks.findIndex((t) => t.id === action.taskId)
          return {
            ...state,
            tasks: [...tasks.slice(0, i), action.task, ...tasks.slice(i + 1, tasks.length)],
          }
        }
        case 'REMOVE_TASK': {
          const { taskGroups, tasks } = state
          if (!taskGroups || !tasks) return state

          return {
            ...state,
            tasks: tasks.filter((task) => task.id !== action.taskId),
            taskGroups: taskGroups.map((taskGroup) => {
              return {
                ...taskGroup,
                taskIds: taskGroup.taskIds.filter((id) => id !== action.taskId),
              }
            }),
          }
        }
        default:
          return state
      }
    },
    {
      current: 'loading',
      errorMessage: null,
      board: null,
      tasks: null,
      taskGroups: null,
    }
  )

  const { current: status, board, taskGroups, tasks } = state
  // const loading = status === 'loading'

  useEffect(() => {
    api.boards.getBoard(boardId).then((data: any) => {
      const { taskGroups, tasks, ...board } = data
      dispatch({ type: 'LOAD_DATA', payload: { taskGroups, tasks, board, current: 'success' } })
    })
  }, [boardId])

  // const tasksRef = useRef(tasks)
  // useEffect(() => {
  //   tasksRef.current = tasks
  // }, [tasks])

  const context: BoardContextType = {
    board,
    taskGroups,
    tasks,
    getTask: (taskId) => {
      return tasks?.find((t: TaskType) => t.id === taskId)
    },
    updateBoardName: (name) => {
      if (!board) return
      api.boards.updateBoard(boardId, { name }).then(() => {
        dispatch({ type: 'UPDATE_BOARD', updates: { name } })
      })
    },
    createTaskGroup: () => {
      if (!taskGroups) return
      api.boards.createTaskGroup(boardId).then((taskGroup: TaskGroupType) => {
        dispatch({ type: 'CREATE_TASK_GROUP', taskGroup })
      })
    },
    removeTaskGroup: (taskGroupId) => {
      api.boards.removeTaskGroup(taskGroupId).then(() => {
        dispatch({ type: 'REMOVE_TASK_GROUP', taskGroupId })
      })
    },
    updateTaskGroupName: (taskGroupId, name) => {
      if (!taskGroups) return
      api.boards.updateTaskGroup(taskGroupId, { name }).then(() => {
        dispatch({ type: 'UPDATE_TASK_GROUP', taskGroupId, updates: { name } })
      })
    },
    updateTaskGroups: (taskGroups) => {
      // Optimistic: Set State before Network Call
      dispatch({ type: 'UPDATE_TASK_GROUPS', taskGroups })
      api.boards.updateTaskGroups(taskGroups)
    },
    createTask: (taskGroupId) => {
      api.boards.createTask(boardId, taskGroupId).then((task: TaskType) => {
        dispatch({ type: 'CREATE_TASK', taskGroupId, task })
      })
    },
    updateTask: useCallback((taskId, task) => {
      api.boards.updateTask(taskId, task).then(() => {
        dispatch({ type: 'UPDATE_TASK', taskId, task })
      })
    }, []),
    removeTask: async (taskId) => {
      api.boards.removeTask(boardId, taskId).then(() => {
        dispatch({ type: 'REMOVE_TASK', taskId })
      })
    },
  }

  return <BoardContext.Provider children={children} value={context} />
}

export const useBoardContext = () => {
  return useContext(BoardContext)
}
