import React, { useState, useEffect, useContext } from 'react'
import classnames from 'classnames'
import { FaCheck } from 'react-icons/fa'
import api from 'ProjectPlanner/api'
import { Task } from 'ProjectPlanner/types'
import { useTaskColor } from 'ProjectPlanner/hooks/useTaskColor'
import { Dialog } from 'ProjectPlanner/Dialog'
import { Avatar } from 'ProjectPlanner/Avatar'
import { Heading } from 'ProjectPlanner/Heading'
import { Minutes } from 'ProjectPlanner/Minutes'
import { Progress } from 'ProjectPlanner/Progress'
import { BoardContext } from 'ProjectPlanner/Board'

type Props = {
  task: Task
  onClose(): void
}

// type ParialTask = {

// }

export const TaskDialog: React.FC<Props> = ({ task: initialTask, onClose }) => {
  const { updateTask: update } = useContext(BoardContext)
  const [task, setTask] = useState(initialTask)
  const [edited, setEdited] = useState(false)
  const color = useTaskColor(task)
  const complete = task.minutes === task.completedMinutes && task.minutes > 0

  function updateTask(data: any) {
    setTask({ ...task, ...data })
    setEdited(true)
  }

  useEffect(() => {
    if (edited) {
      const id = setTimeout(() => {
        update(task.id, { ...task, name: task.name.trim(), content: task.content.trim() })
      }, 400)
      return () => {
        clearTimeout(id)
      }
    }
  }, [edited, task, update])

  return (
    <Dialog onClose={onClose} aria-label="Task Profile Dialog">
      <div className="spacing">
        <div className="flex">
          <div className="flex-1 spacing">
            <input
              className="form-field"
              type="text"
              placeholder="Task Name"
              value={task?.name || ''}
              onChange={(e) => {
                updateTask({ name: e.target.value })
              }}
            />
            <textarea
              className="form-field"
              style={{ minHeight: '9rem' }}
              placeholder="Task"
              value={task?.content || ''}
              onChange={(e) => {
                updateTask({ content: e.target.value })
              }}
            />
          </div>
          <div className="w-40 ml-4 spacing">
            <div className="spacing-small">
              <Heading as="h2" size={4}>
                Assigned To:
              </Heading>
              <div className="avatar-group">
                <Avatar src={'https://avatars3.githubusercontent.com/u/2272118?v=4'} size={2} />
                <Avatar src={'https://avatars3.githubusercontent.com/u/2272118?v=4'} size={2} />
                <Avatar src={'https://avatars3.githubusercontent.com/u/2272118?v=4'} size={2} />
                <Avatar src={'https://avatars3.githubusercontent.com/u/2272118?v=4'} size={2} />
              </div>
            </div>

            <div className="spacing-small">
              <Heading as="h2" size={4}>
                Total Task Minutes:
              </Heading>
              <Minutes
                minutes={task.minutes || 0}
                onChange={(minutes) =>
                  updateTask({
                    minutes,
                    completedMinutes: Math.min(minutes, task.completedMinutes),
                  })
                }
              />
            </div>

            <div className="spacing-small">
              <Heading as="h2" size={4}>
                Minutes Completed: {task?.completedMinutes}/{task?.minutes}
              </Heading>
              {task?.minutes! > 0 && (
                <Progress
                  totalMinutes={task?.minutes || 0}
                  completedMinutes={task?.completedMinutes || 0}
                  color={color}
                  onChange={(completedMinutes) => updateTask({ completedMinutes })}
                />
              )}
              <p className="text-small">
                {task?.minutes! === 0 ? (
                  <i>Set Minutes First</i>
                ) : (
                  <span style={{ color }}>
                    {((task?.completedMinutes! / task?.minutes!) * 100).toFixed(0)}% Complete
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
        <footer className="flex-split">
          <div className="spacing">
            <button className="button button-outline" onClick={onClose}>
              Close
            </button>
          </div>
          <div>
            {task.minutes > 0 && (
              <button
                className={classnames('button', { 'button-green': complete })}
                onClick={() => {
                  if (complete) {
                    onClose()
                  } else {
                    updateTask({ completedMinutes: task.minutes })
                  }
                }}
              >
                {complete ? (
                  <>
                    <FaCheck />
                    <span>Done</span>
                  </>
                ) : (
                  <span>Complete</span>
                )}
              </button>
            )}
          </div>
        </footer>
      </div>
    </Dialog>
  )
}
