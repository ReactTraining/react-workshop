import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { DragDropContext } from 'react-beautiful-dnd'
import { TaskGroup } from 'ProjectPlanner/TaskGroup'
import { Heading } from 'ProjectPlanner/Heading'

import { TaskGroup as TaskGroupType, Task as TaskType } from 'ProjectPlanner/types'
import { EditTitle } from 'ProjectPlanner/EditTitle'

import './Board.scss'

// https://www.freecodecamp.org/news/how-to-add-drag-and-drop-in-react-with-react-beautiful-dnd/

import { BoardProvider, useBoardContext } from './BoardContext'

export const Board: React.FC = () => {
  const boardId = parseInt(useParams<{ boardId: string }>().boardId)
  return (
    <BoardProvider boardId={boardId}>
      <BoardUI />
    </BoardProvider>
  )
}

export const BoardUI: React.FC = () => {
  const { board, taskGroups, updateBoardName, createTaskGroup } = useBoardContext()

  function onDragEnd(result: any) {
    if (!result.destination || !board || !taskGroups) return
    const toIndex: number = result.destination.index
    const fromIndex: number = result.source.index
    const fromListId = parseInt(result.source.droppableId)
    const toListId = parseInt(result.destination.droppableId)
    const newTaskGroups = shuffleArray(taskGroups, fromListId, fromIndex, toListId, toIndex)
    // Optimistic: Set State before Network Call
    // setTaskGroups(newTaskGroups)
    // api.boards.updateTaskGroups(newTaskGroups)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="board spacing">
        <header className="flex spacing">
          <Heading style={{ minWidth: '25rem' }}>
            {board ? (
              <EditTitle title={board.name} placeholder="Board Name" onSave={updateBoardName} />
            ) : (
              ''
            )}
          </Heading>
          <div className="align-right flex-1">...</div>
        </header>

        <div className="board-scroll-area">
          {taskGroups &&
            taskGroups.map((taskGroup) => {
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
            <button className="add-task-group-button" onClick={createTaskGroup}>
              Add Column
            </button>
          </div>
        </div>
      </div>
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
