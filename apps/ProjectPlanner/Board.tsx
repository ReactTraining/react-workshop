import React from 'react'
import { useParams } from 'react-router-dom'
import { DragDropContext } from 'react-beautiful-dnd'
import { TaskGroup } from 'ProjectPlanner/TaskGroup'
import { Heading } from 'ProjectPlanner/Heading'
// import { useBoard, useTaskGroups, useTasks } from 'ProjectPlanner/hooks/dataHooks'
import {
  TaskGroup as TaskGroupType,
  Task as TaskType,
  Board as BoardType,
} from 'ProjectPlanner/types'
import { EditTitle } from 'ProjectPlanner/EditTitle'
import api from 'ProjectPlanner/api'
import './Board.scss'

// https://www.freecodecamp.org/news/how-to-add-drag-and-drop-in-react-with-react-beautiful-dnd/

type BoardContextType = {
  updateBoardName: (name: string) => void
  createTaskGroup: () => void
  updateTaskGroupName: (taskGroupId: number, name: string) => void
  removeTaskGroup: (taskGroupId: number) => void
  getTask: (taskId: number) => TaskType | undefined
  updateTask: (taskId: number, task: TaskType) => void
  createTask: (taskGroupId: number) => void
  removeTask: (taskId: number) => void
}

export const BoardContext = React.createContext<BoardContextType>(null!)
export type BoardContextActionTypes = BoardContextActions['type']
export type BoardContextActions =
  | {
      type: 'SET_BOARD'
      board: BoardType
      taskGroups: TaskGroupType[]
      tasks: TaskType[]
    }
  | {
      type: 'UPDATE_BOARD'
      board: BoardType
    }
  | {
      type: 'REQUEST_BOARD_UPDATE'
      board: Partial<BoardType>
    }
  | {
      type: 'UPDATE_TASK_GROUPS'
      taskGroups: TaskGroupType[]
    }
  | {
      type: 'TASK_GROUP_ADD'
      taskGroup: TaskGroupType
    }
  | {
      type: 'REQUEST_TASK_GROUP_UPDATE'
      taskGroups: TaskGroupType[]
    }
  | {
      type: 'REQUEST_TASK_GROUP_UPDATE'
      id: number
      data: Partial<TaskGroupType>
    }
  | {
      type: 'REQUEST_TASK_GROUP_REMOVE'
      id: number
    }
  | {
      type: 'REQUEST_TASK_GROUP_ADD'
    }
  | {
      type: 'UPDATE_TASKS'
      tasks: TaskType[]
    }
  | {
      type: 'TASK_ADD'
      task: TaskType
    }
  | {
      type: 'REQUEST_TASK_UPDATE'
      id: number
      data: Partial<TaskType>
    }
  | {
      type: 'REQUEST_TASK_REMOVE'
      id: number
    }
  | {
      type: 'REQUEST_TASK_ADD'
      taskGroupId?: number
    }
  | { type: 'BOARD_LOADING_ERROR' }
  | { type: 'TASK_GROUP_LOADING_ERROR' }
  | { type: 'TASK_LOADING_ERROR' }
  | { type: 'BOARD_UPDATE_ERROR' }
  | { type: 'LOAD_BOARD' }
  | { type: 'GENERAL_ERROR'; message: string }

type State = {
  value: 'loading' | 'loaded' | 'error' | 'updating-board' | 'updating-task' | 'updating-task-group'
  errorMessage: null | string
  board: null | BoardType
  tasks: null | TaskType[]
  taskGroups: null | TaskGroupType[]
  nextBoard: null | BoardType
  nextTaskGroups: null | TaskGroupType[]
  nextTasks: null | TaskType[]
  lastActionType: null | BoardContextActionTypes
  lastActionData: any
}

export const Board: React.FC = () => {
  const boardId = parseInt(useParams<{ boardId: string }>().boardId)

  const [state, dispatch] = React.useReducer(
    (state: State, action: BoardContextActions): State => {
      switch (action.type) {
        case 'SET_BOARD': {
          return state.value === 'loading'
            ? {
                ...state,
                errorMessage: null,
                value: 'loaded',
                nextBoard: null,
                board: action.board,
                taskGroups: action.taskGroups,
                tasks: action.tasks,
                lastActionType: action.type,
              }
            : state
        }
        case 'REQUEST_BOARD_UPDATE': {
          return state.value === 'loaded'
            ? {
                ...state,
                errorMessage: null,
                value: 'updating-board',
                nextBoard: {
                  ...state.board!,
                  ...action.board,
                },
                lastActionType: action.type,
              }
            : state
        }
        case 'UPDATE_BOARD': {
          return state.value === 'updating-board'
            ? {
                ...state,
                errorMessage: null,
                value: 'loaded',
                nextBoard: null,
                board: action.board,
                lastActionType: action.type,
              }
            : state
        }
        case 'REQUEST_TASK_GROUP_UPDATE': {
          if (!state.taskGroups) {
            return state
          }

          if ('taskGroups' in action) {
            return state.value === 'loaded'
              ? {
                  ...state,
                  errorMessage: null,
                  value: 'updating-task-group',
                  nextTaskGroups: action.taskGroups,
                  lastActionType: action.type,
                }
              : state
          }

          let updatedTaskGroup: TaskGroupType | null = null
          let nextTaskGroups: TaskGroupType[] = []
          for (let group of state.taskGroups) {
            if (group.id === action.id) {
              updatedTaskGroup = { ...group, ...action.data }
              nextTaskGroups.push(updatedTaskGroup)
            } else {
              nextTaskGroups.push(group)
            }
          }

          return updatedTaskGroup && state.value === 'loaded'
            ? {
                ...state,
                errorMessage: null,
                value: 'updating-task-group',
                nextTaskGroups,
                lastActionType: action.type,
              }
            : state
        }
        case 'REQUEST_TASK_GROUP_ADD': {
          if (!state.taskGroups) {
            return state
          }

          return state.value === 'loaded'
            ? {
                ...state,
                errorMessage: null,
                value: 'updating-task-group',
                lastActionType: action.type,
              }
            : state
        }
        case 'REQUEST_TASK_GROUP_REMOVE': {
          if (!state.taskGroups) {
            return state
          }

          return state.value === 'loaded'
            ? {
                ...state,
                errorMessage: null,
                value: 'updating-task-group',
                nextTaskGroups: state.taskGroups.filter((group) => group.id === action.id),
                lastActionType: action.type,
                lastActionData: action.id,
              }
            : state
        }
        case 'UPDATE_TASK_GROUPS': {
          return state.value === 'updating-task-group'
            ? {
                ...state,
                errorMessage: null,
                value: 'loaded',
                nextTaskGroups: null,
                taskGroups: action.taskGroups,
                lastActionType: action.type,
              }
            : state
        }
        case 'TASK_GROUP_ADD': {
          return state.value === 'updating-task-group'
            ? {
                ...state,
                errorMessage: null,
                value: 'loaded',
                nextTaskGroups: null,
                taskGroups: state.taskGroups!.concat(action.taskGroup),
                lastActionType: action.type,
              }
            : state
        }
        case 'REQUEST_TASK_UPDATE': {
          if (!state.tasks) {
            return state
          }

          let updatedTask: TaskType | null = null
          let nextTasks: TaskType[] = []
          for (let task of state.tasks) {
            if (task.id === action.id) {
              updatedTask = { ...task, ...action.data }
              nextTasks.push(updatedTask)
            } else {
              nextTasks.push(task)
            }
          }

          return updatedTask && state.value === 'loaded'
            ? {
                ...state,
                errorMessage: null,
                value: 'updating-task',
                nextTasks,
                lastActionType: action.type,
              }
            : state
        }
        case 'REQUEST_TASK_ADD': {
          if (!state.tasks) {
            return state
          }

          let taskGroupToUpdate: TaskGroupType | null = null
          if (action.taskGroupId != null) {
            taskGroupToUpdate =
              state.taskGroups?.find((group) => group.id === action.taskGroupId) || null
          }

          return state.value === 'loaded'
            ? {
                ...state,
                errorMessage: null,
                value: 'updating-task',
                lastActionType: action.type,
                lastActionData: {
                  taskGroupId: action.taskGroupId,
                  previousTaskGroups: state.taskGroups,
                  taskGroupToUpdate,
                },
              }
            : state
        }
        case 'REQUEST_TASK_REMOVE': {
          if (!state.tasks) {
            return state
          }

          return state.value === 'loaded'
            ? {
                ...state,
                errorMessage: null,
                value: 'updating-task',
                nextTasks: state.tasks.filter((task) => task.id === action.id),
                lastActionType: action.type,
                lastActionData: action.id,
              }
            : state
        }
        case 'UPDATE_TASKS': {
          return state.value === 'updating-task'
            ? {
                ...state,
                errorMessage: null,
                value: 'loaded',
                nextTasks: null,
                tasks: action.tasks,
                lastActionType: action.type,
              }
            : state
        }
        case 'TASK_ADD': {
          return state.value === 'updating-task'
            ? {
                ...state,
                errorMessage: null,
                value: 'loaded',
                nextTasks: null,
                tasks: state.tasks!.concat(action.task),
                lastActionType: action.type,
              }
            : state
        }
        case 'LOAD_BOARD': {
          return {
            ...state,
            errorMessage: null,
            value: 'loading',
            nextBoard: null,
            board: null,
            taskGroups: null,
            tasks: null,
            lastActionType: action.type,
          }
        }
        case 'BOARD_LOADING_ERROR': {
          return {
            ...state,
            errorMessage: 'Error loading the board, please try again!',
            value: 'error',
            nextBoard: null,
            board: null,
            taskGroups: null,
            tasks: null,
            lastActionType: action.type,
          }
        }
        case 'TASK_GROUP_LOADING_ERROR': {
          return {
            ...state,
            errorMessage: 'Error loading the task groups, please try again!',
            value: 'error',
            lastActionType: action.type,
          }
        }
        case 'TASK_LOADING_ERROR': {
          return {
            ...state,
            errorMessage: 'Error loading the tasks, please try again!',
            value: 'error',
            lastActionType: action.type,
          }
        }
        case 'GENERAL_ERROR': {
          return {
            ...state,
            errorMessage: action.message,
            value: 'error',
            lastActionType: action.type,
          }
        }
        case 'BOARD_UPDATE_ERROR': {
          return {
            ...state,
            errorMessage: 'Failed to update, try again later!',
            value: 'loaded',
            nextBoard: null,
            lastActionType: action.type,
          }
        }
        default:
          return state
      }
    },
    {
      errorMessage: null,
      value: 'loading',
      board: null,
      tasks: null,
      taskGroups: null,
      nextBoard: null,
      nextTaskGroups: null,
      nextTasks: null,
      lastActionType: null,
      lastActionData: null,
    }
  )

  // The task groups as stored in reducer state won't be updated immediately
  // after user interactions. To prevent any lag when updating the board we'll
  // have some separate local state that will update immediately after some
  // interactions and in response to changes from the reducer state.
  const [visibleTaskGroups, setVisibleTaskGroups] = React.useState(state.taskGroups)
  React.useEffect(() => {
    setVisibleTaskGroups(state.taskGroups)
  }, [state.taskGroups])

  const lastActionTypeRef = React.useRef(state.lastActionType)
  React.useEffect(() => {
    lastActionTypeRef.current = state.lastActionType
  }, [state.lastActionType])

  React.useEffect(
    function loadAllBoardData() {
      let isCurrent = true
      dispatch({ type: 'LOAD_BOARD' })

      getBoard()
        .then((board) => {
          return Promise.all([Promise.resolve(board), getTaskGroups(board), getTasks(board)])
        })
        .then(([board, taskGroups, tasks]) => {
          if (isCurrent && board && taskGroups && tasks) {
            dispatch({ type: 'SET_BOARD', board, taskGroups, tasks })
          }
        })

      async function getBoard() {
        try {
          const board: BoardType = await api.boards.getBoard(boardId)
          if (!board) {
            if (isCurrent) {
              dispatch({ type: 'BOARD_LOADING_ERROR' })
            }
            return null
          }
          return board
        } catch (err) {
          if (isCurrent) {
            dispatch({ type: 'GENERAL_ERROR', message: err.message })
          }
          return null
        }
      }

      async function getTaskGroups(board: BoardType | null): Promise<TaskGroupType[] | null> {
        try {
          if (!board) {
            return null
          }
          const taskGroups: TaskGroupType[] = await api.boards.getTaskGroups(board.id)
          if (!taskGroups) {
            if (isCurrent) {
              dispatch({ type: 'TASK_GROUP_LOADING_ERROR' })
            }
            return null
          }
          return taskGroups
        } catch (err) {
          if (isCurrent) {
            dispatch({ type: 'GENERAL_ERROR', message: err.message })
          }
          return null
        }
      }

      async function getTasks(board: BoardType | null): Promise<TaskType[] | null> {
        try {
          if (!board) {
            return null
          }
          const tasks: TaskType[] = await api.boards.getTasks(board.id)
          if (!tasks) {
            if (isCurrent) {
              dispatch({ type: 'TASK_LOADING_ERROR' })
            }
            return null
          }
          return tasks
        } catch (err) {
          if (isCurrent) {
            dispatch({ type: 'GENERAL_ERROR', message: err.message })
          }
          return null
        }
      }

      return () => {
        isCurrent = false
      }
    },
    [boardId]
  )

  React.useEffect(
    function handleBoardUpdate() {
      let isCurrent = true
      let nextBoard = state.nextBoard
      let lastActionType = lastActionTypeRef.current
      if (
        state.value === 'updating-board' &&
        lastActionType !== 'REQUEST_BOARD_UPDATE' &&
        nextBoard
      ) {
        api.boards.updateBoard(boardId, nextBoard).then((board: BoardType) => {
          if (isCurrent) {
            if (board) {
              dispatch({ type: 'UPDATE_BOARD', board })
            } else {
              dispatch({ type: 'BOARD_UPDATE_ERROR' })
            }
          }
        })
      }

      return () => {
        isCurrent = false
      }
    },
    [boardId, state.value, state.nextBoard]
  )

  React.useEffect(
    function handleTaskGroupUpdate() {
      let isCurrent = true
      let lastActionType = lastActionTypeRef.current
      if (state.value === 'updating-task-group') {
        if (state.nextTaskGroups && lastActionType === 'REQUEST_TASK_GROUP_UPDATE') {
          api.boards.updateTaskGroups(state.nextTaskGroups).then((taskGroups: TaskGroupType[]) => {
            if (isCurrent) {
              if (taskGroups) {
                dispatch({ type: 'UPDATE_TASK_GROUPS', taskGroups })
              } else {
                // error handling
              }
            }
          })
        } else if (lastActionType === 'REQUEST_TASK_GROUP_ADD') {
          api.boards.createTaskGroup(boardId).then((newTaskGroup: TaskGroupType) => {
            if (isCurrent) {
              dispatch({ type: 'TASK_GROUP_ADD', taskGroup: newTaskGroup })
            }
          })
        } else if (lastActionType === 'REQUEST_TASK_GROUP_REMOVE') {
          api.boards.removeTaskGroup(state.lastActionData).then((taskGroups: TaskGroupType[]) => {
            if (isCurrent) {
              dispatch({ type: 'UPDATE_TASK_GROUPS', taskGroups })
            } else {
              // error handling
            }
          })
        }
      }

      return () => {
        isCurrent = false
      }
    },
    [state.nextTaskGroups, state.value, state.lastActionData, boardId]
  )

  React.useEffect(
    function handleTaskUpdate() {
      let isCurrent = true
      let nextTasks = state.nextTasks
      let lastActionType = lastActionTypeRef.current
      if (state.value === 'updating-task') {
        if (nextTasks) {
          if (lastActionType === 'REQUEST_TASK_UPDATE') {
            let p: Promise<TaskType>[] = []
            // in a real app we would only update the tasks that changed
            for (const task of nextTasks) {
              p.push(api.boards.updateTask(task.id, task))
            }
            Promise.all(p).then((tasks) => {
              if (isCurrent) {
                if (tasks) {
                  dispatch({ type: 'UPDATE_TASKS', tasks })
                } else {
                  // error handling
                }
              }
            })
          } else if (lastActionType === 'REQUEST_TASK_ADD') {
            api.boards
              .createGroupedTask(boardId, state.lastActionData?.taskGroupId)
              .then(([newTask]) => Promise.all([newTask, api.boards.getTaskGroups(boardId)]))
              .then(([newTask, taskGroups]) => {
                if (isCurrent) {
                  dispatch({ type: 'TASK_ADD', task: newTask })
                  dispatch({ type: 'UPDATE_TASK_GROUPS', taskGroups })
                }
              })
          } else if (lastActionType === 'REQUEST_TASK_REMOVE') {
            api.boards.removeTask(state.lastActionData).then((tasks: TaskType[]) => {
              if (isCurrent) {
                dispatch({ type: 'UPDATE_TASKS', tasks })
              } else {
                // error handling
              }
            })
          }
        }
      }

      return () => {
        isCurrent = false
      }
    },
    [state.nextTasks, state.value, state.lastActionData, boardId]
  )

  const tasksRef = React.useRef(state.tasks)
  React.useEffect(() => {
    tasksRef.current = state.tasks
  }, [state.tasks])

  const context: BoardContextType = React.useMemo(
    () => ({
      updateBoardName(name) {
        dispatch({ type: 'REQUEST_BOARD_UPDATE', board: { name } })
      },
      createTaskGroup() {
        dispatch({ type: 'REQUEST_TASK_GROUP_ADD' })
      },
      updateTaskGroupName(id, name) {
        dispatch({ type: 'REQUEST_TASK_GROUP_UPDATE', id, data: { name } })
      },
      removeTaskGroup(id) {
        dispatch({ type: 'REQUEST_TASK_GROUP_REMOVE', id })
      },
      // this probably needs to go somewhere else to prevent context from
      // re-rendering, since it has to change when tasks change. Used a ref to
      // prevent this for now.
      getTask(taskId) {
        return tasksRef.current?.find((t: TaskType) => t.id === taskId)
      },
      updateTask(id, task) {
        dispatch({ type: 'REQUEST_TASK_UPDATE', id, data: task })
      },
      createTask(taskGroupId) {
        dispatch({ type: 'REQUEST_TASK_ADD', taskGroupId })
      },
      removeTask(id) {
        dispatch({ type: 'REQUEST_TASK_GROUP_REMOVE', id })
      },
    }),
    []
  )

  function onDragEnd(result: any) {
    if (!result.destination || !state.board || !state.taskGroups) return
    const toIndex: number = result.destination.index
    const fromIndex: number = result.source.index
    const fromListId = parseInt(result.source.droppableId)
    const toListId = parseInt(result.destination.droppableId)
    const taskGroups = shuffleArray(state.taskGroups, fromListId, fromIndex, toListId, toIndex)

    // Optimistic: Set State before Network Call
    setVisibleTaskGroups(taskGroups)
    dispatch({ type: 'REQUEST_TASK_GROUP_UPDATE', taskGroups })
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <BoardContext.Provider value={context}>
        <div className="board spacing">
          <header className="flex spacing">
            <Heading style={{ minWidth: '25rem' }}>
              {state.board ? (
                <EditTitle
                  title={state.board.name}
                  placeholder="Board Name"
                  onSave={context.updateBoardName}
                />
              ) : (
                ''
              )}
            </Heading>
            <div className="align-right flex-1">...</div>
          </header>

          <div className="board-scroll-area">
            {visibleTaskGroups &&
              visibleTaskGroups.map((taskGroup) => {
                return (
                  <div className="task-group-wrap" key={taskGroup.id}>
                    <TaskGroup
                      taskGroupId={taskGroup.id}
                      name={taskGroup.name}
                      taskIds={taskGroup.taskIds}
                    />
                  </div>
                )
              })}

            <div>
              <button className="add-task-group-button" onClick={context.createTaskGroup}>
                Add Column
              </button>
            </div>
          </div>
        </div>
      </BoardContext.Provider>
    </DragDropContext>
  )
}

/**
 * Utils
 */

function shuffleArray(
  taskGroups: TaskGroupType[],
  fromListId: number,
  fromIndex: number,
  toListId: number,
  toIndex: number
): TaskGroupType[] {
  return taskGroups.map((taskGroup) => {
    const isTo = taskGroup.id === toListId
    const isFrom = taskGroup.id === fromListId
    const taskIds = [...taskGroup.taskIds]

    // Moving to and from same array
    if (isTo && isFrom) {
      taskIds.splice(toIndex, 0, taskIds.splice(fromIndex, 1)[0])
      return { ...taskGroup, taskIds }

      // Move to different array
    } else {
      if (isTo) {
        const fromItemId = taskGroups.find((l) => l.id === fromListId)?.taskIds[fromIndex]
        if (fromItemId) {
          return {
            ...taskGroup,
            taskIds: [
              ...taskIds.slice(0, toIndex),
              fromItemId,
              ...taskIds.slice(toIndex, taskIds.length),
            ],
          }
        }
      } else if (isFrom) {
        return {
          ...taskGroup,
          taskIds: taskIds.filter((id) => id !== taskIds[fromIndex]),
        }
      }
    }

    return taskGroup
  })
}
