import React, { useState, useContext } from 'react'
import { format, parse } from 'date-fns'
import { Draggable } from 'react-beautiful-dnd'
import { FaCalendar, FaTrash } from 'react-icons/fa'
import { TaskColor } from 'ProjectPlanner/TaskColor'
import { Heading } from 'ProjectPlanner/Heading'
import { DialogConfirm } from 'ProjectPlanner/Dialog'
import { BoardContext } from 'ProjectPlanner/Board'
import 'ProjectPlanner/TaskCard.scss'

type Props = {
  taskId: number
  onClick(): void
  index: number
}

export const TaskCard: React.FC<Props> = ({ taskId, onClick, index }) => {
  const [promptRemove, setPromptRemove] = useState(false)
  const { getTask, removeTask } = useContext(BoardContext)
  const task = getTask(taskId)

  function handleKeydown(event: React.KeyboardEvent) {
    if (promptRemove) return
    if (event.key === 'Backspace') setPromptRemove(true)
    if (event.key === 'Enter') onClick()
  }

  return (
    <Draggable draggableId={taskId + ''} index={index}>
      {(provided: any) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            tabIndex={0}
            onKeyDown={handleKeydown}
            onClick={(event: React.MouseEvent<HTMLDivElement>) => {
              // The implementation of the drag-n-drop takes focus
              // away when you mouseDown on this div, we want it to have
              // focus just before we expand the dialog so that when the
              // dialog closes, the focus is returned here
              event.currentTarget.focus()
              onClick()
            }}
          >
            {promptRemove && (
              <DialogConfirm
                onConfirm={() => {
                  removeTask(taskId)
                  setPromptRemove(false)
                }}
                onCancel={() => setPromptRemove(false)}
                aria-label="Remove Task?"
              >
                ⚠️ Are you sure you want to remove this task?
              </DialogConfirm>
            )}
            {task && (
              <TaskColor task={task}>
                <div className="task-card">
                  <div className="task-card-content spacing-small">
                    <Heading size={3}>{task.name}</Heading>
                    <div className="task-card-content">{task.content || <i>No Content</i>}</div>
                  </div>
                  <footer className="flex-split">
                    <div className="horizontal-spacing">
                      <span className="text-icon text-small text-light">
                        <FaCalendar color={`var(--taskColor)`} />
                        <span>{format(parse(task.date, 'yyyy-MM-dd', new Date()), 'MMM d')}</span>
                      </span>
                    </div>
                    <div>
                      <button
                        className="remove-task-button button-icon text-small"
                        tabIndex={-1}
                        onClick={(e) => {
                          e.stopPropagation()
                          setPromptRemove(true)
                        }}
                      >
                        <FaTrash color="#696ad8" />
                      </button>
                    </div>
                  </footer>
                </div>
              </TaskColor>
            )}
          </div>
        )
      }}
    </Draggable>
  )
}
