import React, { useState, useContext } from 'react'
import { MdModeComment } from 'react-icons/md'
import { FaCalendar, FaTrash } from 'react-icons/fa'
import { useTaskColor } from 'ProjectPlanner/useTaskColor'
import { Heading } from 'ProjectPlanner/Heading'
import { TaskDialog } from 'ProjectPlanner/TaskDialog'
import { DialogConfirm } from 'ProjectPlanner/Dialog'
import { BoardContext } from 'ProjectPlanner/Board'
import 'ProjectPlanner/TaskCard.scss'

type Props = {
  taskId: number
}

export const TaskCard: React.FC<Props> = ({ taskId, children }) => {
  const [expanded, setExpanded] = useState(false)
  const [promptRemove, setPromptRemove] = useState(false)
  const { getTask, removeTask } = useContext(BoardContext)
  const task = getTask(taskId)
  const color = useTaskColor(task!)

  return (
    <>
      {task && expanded && <TaskDialog onClose={() => setExpanded(false)} task={task} />}
      {promptRemove && (
        <DialogConfirm
          onConfirm={() => {
            removeTask(taskId)
            setPromptRemove(false)
          }}
          onCancel={() => setPromptRemove(false)}
          aria-label="Remove Task?"
        >
          Are you sure you want to remove this task?
        </DialogConfirm>
      )}
      <div
        className="task-card"
        onClick={() => setExpanded(true)}
        style={{ borderLeftColor: color }}
      >
        <div className="task-card-content spacing-small">
          {task && <Heading size={3}>{task.name}</Heading>}
          <div className="task-card-content">
            {!task?.content ? <i>No Content</i> : task.content}
          </div>
        </div>
        <footer className="flex-split">
          <div className="horizontal-spacing">
            <span className="text-icon text-small text-light">
              <FaCalendar color={color} />
              <span>May 13th</span>
            </span>
            {/* <span className="text-icon text-small text-light">
              <MdModeComment color="#04b3ff" />
              <span>4</span>
            </span> */}
          </div>
          <div>
            <button
              className="remove-task button-icon text-small"
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
    </>
  )
}
