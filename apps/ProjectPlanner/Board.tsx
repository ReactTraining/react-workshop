import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { DragDropContext } from 'react-beautiful-dnd'
import { TaskGroup } from './TaskGroup'
import { Heading } from './Heading'
import { useBoard, useTaskGroups, useTasks } from './hooks/dataHooks'
import { TaskGroup as TaskGroupType, Task as TaskType } from './types'
import { EditTitle } from './EditTitle'
import api from './api'
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

export const Board: React.FC = () => {
  const boardId = parseInt(useParams<{ boardId: string }>().boardId)
  const [board, setBoard] = useBoard(boardId)
  const [tasks, setTasks] = useTasks(boardId)
  const [taskGroups, setTaskGroups] = useTaskGroups(boardId)

  function onDragEnd(result: any) {
    if (!result.destination || !board || !taskGroups) return
    const toIndex: number = result.destination.index
    const fromIndex: number = result.source.index
    const fromListId = parseInt(result.source.droppableId)
    const toListId = parseInt(result.destination.droppableId)
    const newTaskGroups = shuffleArray(taskGroups, fromListId, fromIndex, toListId, toIndex)

    // Optimistic: Set State before Network Call
    setTaskGroups(newTaskGroups)
    api.boards.updateTaskGroups(newTaskGroups)
  }

  const context: BoardContextType = {
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
      return tasks?.find((t) => t.id === taskId)
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
      api.boards.updateTaskGroups(newTaskGroups)
    },
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <BoardContext.Provider value={context}>
        <div className="board spacing">
          <header className="flex spacing">
            <Heading style={{ minWidth: '25rem' }}>
              {board ? (
                <EditTitle
                  title={board.name}
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
            {taskGroups &&
              tasks &&
              taskGroups.map((taskGroup) => {
                return (
                  <div className="task-group-wrap" key={taskGroup.id}>
                    <TaskGroup
                      taskGroupId={taskGroup.id}
                      name={taskGroup.name}
                      taskIds={taskGroup.taskIds}
                      tasks={tasks}
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
