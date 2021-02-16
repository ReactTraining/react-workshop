import React from 'react'
import classnames from 'classnames'
import { FaCheck } from 'react-icons/fa'
import { Dialog } from 'ProjectPlanner/Dialog'
import { Heading } from 'ProjectPlanner/Heading'
import { Minutes } from 'ProjectPlanner/Minutes'
import { Progress } from 'ProjectPlanner/Progress'
import { Task } from './index'
// import { TaskColor } from './TaskColor'
import 'ProjectPlanner/TaskDialog.scss'

type Props = {
  task: Task
  update(partialTask: Partial<Task>): void
  onClose(): void
}

export const TaskDialog: React.FC<Props> = ({ task, update, onClose }) => {
  const complete = (task && task.minutes === task.completedMinutes && task.minutes > 0) || false

  return (
    <Dialog onClose={onClose} aria-label="Edit Task">
      <div className="spacing">
        <div className="flex">
          <div className="flex-1 spacing">
            <input
              className="form-field"
              type="text"
              placeholder="Task Name"
              value={task?.name || ''}
              onChange={(e) => {
                update({ name: e.target.value })
              }}
            />
            <textarea
              className="form-field"
              style={{ minHeight: '9rem' }}
              placeholder="Task"
              value={task?.content || ''}
              onChange={(e) => {
                update({ content: e.target.value })
              }}
            />
          </div>
          <div className="w-40 ml-4 spacing">
            <div className="spacing-small">
              <Heading as="h2" size={4}>
                Total Task Minutes:
              </Heading>
              {task && (
                <Minutes
                  minutes={task.minutes}
                  min={task.completedMinutes}
                  onChange={(minutes) => update({ minutes })}
                />
              )}
            </div>

            <div className="spacing-small">
              <Heading as="h2" size={4}>
                Minutes Completed: {task?.completedMinutes}/{task?.minutes}
              </Heading>
              {task && task.minutes > 0 && (
                <Progress
                  totalMinutes={task.minutes || 0}
                  completedMinutes={task.completedMinutes || 0}
                  onChange={(completedMinutes) => update({ completedMinutes })}
                />
              )}
              <p className="text-small">
                {task && task.minutes === 0 && <i>Set Minutes First</i>}
                {task && task.minutes > 0 && (
                  <span className="task-completion-status">
                    {((task.completedMinutes / task.minutes) * 100).toFixed(0)}% Complete
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
        <footer className="align-right horizontal-spacing">
          <button className="button button-outline" onClick={onClose}>
            Close
          </button>

          {task && task.minutes > 0 && (
            <button
              className={classnames('button', { 'button-green': complete })}
              onClick={() => {
                if (complete) {
                  onClose()
                } else {
                  update({ completedMinutes: task.minutes })
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
        </footer>
      </div>
    </Dialog>
  )
}
