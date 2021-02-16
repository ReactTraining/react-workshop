import React, { useContext, useEffect, useReducer, useRef, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Board as BoardType,
  TaskGroup as TaskGroupType,
  Task as TaskType,
} from 'ProjectPlanner/types'
import { api } from 'ProjectPlanner/api'

type Props = {
  boardId: number
}

type BoardContextType = {
  board: BoardType | null
  taskGroups: TaskGroupType[] | null
  tasks: TaskType[] | null
  loading: boolean

  getTask: (taskId: number) => TaskType | undefined
  updateTask: (taskId: number, task: TaskType) => void
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
  | { type: 'UPDATE_TASK'; taskId: number; task: TaskType }

export const BoardProvider: React.FC<Props> = ({ boardId, children }) => {
  const history = useHistory()
  const [state, dispatch] = useReducer(
    (state: State, action: Actions) => {
      switch (action.type) {
        case 'LOAD_DATA': {
          return { ...state, ...action.payload }
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
  const loading = status === 'loading'

  useEffect(() => {
    api.boards.getBoard(boardId).then((data) => {
      const { taskGroups, tasks, ...board } = data
      if (!board.id) {
        history.push('/boards')
        return
      }
      dispatch({ type: 'LOAD_DATA', payload: { taskGroups, tasks, board, current: 'success' } })
    })
  }, [boardId, history])

  const context: BoardContextType = {
    board,
    taskGroups,
    tasks,
    loading,

    getTask: (taskId) => {
      return tasks?.find((t: TaskType) => t.id === taskId)
    },
    updateTask: useCallback((taskId, task) => {
      api.boards.updateTask(taskId, task).then(() => {
        dispatch({ type: 'UPDATE_TASK', taskId, task })
      })
    }, []),
  }

  return <BoardContext.Provider children={children} value={context} />
}

export const useBoardContext = () => {
  return useContext(BoardContext)
}
