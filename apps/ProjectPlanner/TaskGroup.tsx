import React, { useState, useContext } from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { BsThreeDots } from 'react-icons/bs'
import { TaskCard } from 'ProjectPlanner/TaskCard'
import { Heading } from 'ProjectPlanner/Heading'
import { EditTitle } from 'ProjectPlanner/EditTitle'
import { BoardContext } from 'ProjectPlanner/Board'
import { Task } from 'ProjectPlanner/types'
import 'ProjectPlanner/TaskGroup.scss'

type Props = {
  taskGroupId: number
  name: string
  taskIds: number[]
  tasks: Task[]
}

export const TaskGroup: React.FC<Props> = ({ taskGroupId, name, taskIds }) => {
  const { createTask, updateTaskGroupName } = useContext(BoardContext)
  const [minutes, setMinutes] = useState(0)

  return (
    <Droppable droppableId={`${taskGroupId}`}>
      {(provided: any) => {
        return (
          <div className="task-group spacing">
            <Heading size={3}>
              <EditTitle title={name} onSave={(name) => updateTaskGroupName(taskGroupId, name)} />
            </Heading>

            <div className="dropzone" {...provided.droppableProps} ref={provided.innerRef}>
              {Array.isArray(taskIds) &&
                taskIds.map((taskId, index) => {
                  return (
                    <Draggable key={taskId} draggableId={taskId + ''} index={index}>
                      {(provided: any) => {
                        return (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TaskCard taskId={taskId} />
                          </div>
                        )
                      }}
                    </Draggable>
                  )
                })}
              {provided.placeholder}
            </div>

            <div className="flex-split">
              <div>...</div>
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
