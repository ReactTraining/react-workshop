import React, { useContext, useState } from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { FaTrash } from 'react-icons/fa'
import { TaskCard } from './TaskCard'
import { Heading } from './Heading'
import { EditTitle } from './EditTitle'
import { DialogConfirm } from './Dialog'
import { BoardContext } from './Board'
import { Task } from './types'
import 'ProjectPlanner/TaskGroup.scss'

type Props = {
  taskGroupId: number
  name: string
  taskIds: number[]
  tasks: Task[]
}

export const TaskGroup: React.FC<Props> = ({ taskGroupId, name, taskIds }) => {
  const [promptRemove, setPromptRemove] = useState(false)
  const { createTask, updateTaskGroupName, removeTaskGroup } = useContext(BoardContext)

  return (
    <Droppable droppableId={`${taskGroupId}`}>
      {(provided: any) => {
        return (
          <div className="task-group spacing">
            {promptRemove && (
              <DialogConfirm
                onConfirm={() => {
                  removeTaskGroup(taskGroupId)
                  setPromptRemove(false)
                }}
                onCancel={() => setPromptRemove(false)}
                aria-label="Remove All Tasks?"
              >
                ⚠️ Are you sure you want to remove this column and all of its tasks?
              </DialogConfirm>
            )}
            <div className="flex">
              <div className="flex-1 spacing">
                <Heading size={3}>
                  <EditTitle
                    title={name}
                    placeholder="Column Name"
                    onSave={(name) => updateTaskGroupName(taskGroupId, name)}
                  />
                </Heading>
              </div>
              <div className="ml-2">
                <button
                  className="button-remove-board button-icon text-small"
                  tabIndex={-1}
                  onClick={(e) => {
                    // e.stopPropagation()
                    setPromptRemove(true)
                  }}
                >
                  <FaTrash color="#696ad8" />
                </button>
              </div>
            </div>

            <div className="dropzone" {...provided.droppableProps} ref={provided.innerRef}>
              {Array.isArray(taskIds) &&
                taskIds.map((taskId, index) => {
                  return <TaskCard key={taskId} taskId={taskId} index={index} />
                })}
              {provided.placeholder}
            </div>

            <div className="flex-split">
              <div>
                {/* <button className="button button-outline" onClick={() => {}}>
                  Remove
                </button> */}
              </div>
              <div>
                <button className="button button-outline" onClick={() => createTask(taskGroupId)}>
                  Add Card
                </button>
              </div>
            </div>
          </div>
        )
      }}
    </Droppable>
  )
}
