import React, { useState } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { FaTrash } from 'react-icons/fa'
import { TaskCard } from 'ProjectPlanner/TaskCard'
import { Heading } from 'ProjectPlanner/Heading'
import { EditTitle } from 'ProjectPlanner/EditTitle'
import { DialogConfirm } from 'ProjectPlanner/Dialog'
import { TaskDialog } from 'ProjectPlanner/TaskDialog'
import { useBoardContext } from 'ProjectPlanner/BoardContext'
import 'ProjectPlanner/TaskGroup.scss'

type Props = {
  taskGroupId: number
  name: string
  taskIds: number[]
}

export const TaskGroup: React.FC<Props> = ({ taskGroupId, name, taskIds }) => {
  const [promptRemove, setPromptRemove] = useState(false)
  const { createTask, updateTaskGroupName, removeTaskGroup } = useBoardContext()
  const [expandTaskId, setExpandTaskId] = useState<number | null>(null)

  return (
    <Droppable droppableId={`${taskGroupId}`}>
      {(provided: any) => {
        return (
          <div className="task-group spacing">
            {expandTaskId && (
              <TaskDialog
                onClose={() => setExpandTaskId(null)}
                taskId={expandTaskId}
                siblingTaskIds={taskIds}
                onChangeTaskId={setExpandTaskId}
              />
            )}
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
                  onClick={() => setPromptRemove(true)}
                >
                  <FaTrash color="#696ad8" />
                </button>
              </div>
            </div>

            <div className="dropzone" {...provided.droppableProps} ref={provided.innerRef}>
              {Array.isArray(taskIds) &&
                taskIds.map((taskId, index) => {
                  return (
                    <TaskCard
                      key={taskId}
                      taskId={taskId}
                      onClick={() => setExpandTaskId(taskId)}
                      index={index}
                    />
                  )
                })}
              {provided.placeholder}
            </div>

            <div className="align-right">
              <button className="button button-outline" onClick={() => createTask(taskGroupId)}>
                Add Card
              </button>
            </div>
          </div>
        )
      }}
    </Droppable>
  )
}
