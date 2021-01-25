import React, { useState, useEffect, useContext } from 'react'
import classnames from 'classnames'
import { FaCheck } from 'react-icons/fa'
// import { useTaskColor } from 'ProjectPlanner/hooks/useTaskColor'
import { Dialog } from 'ProjectPlanner/Dialog'
import { Avatar } from 'ProjectPlanner/Avatar'
import { Heading } from 'ProjectPlanner/Heading'
import { Minutes } from 'ProjectPlanner/Minutes'
import { Progress } from 'ProjectPlanner/Progress'
import { Task } from './types'

type Props = {
  task: Task
  color: string
  onClose(): void
  // Partial is a utility that takes the type we pass in and makes a new
  // type where every key is optional. So this way someone can now call
  // updateTask with an object that only represents a "partially" completed
  // version of the full Task type, like this: updateTask({ minutes: 7 })
  updateTask(partialTask: Partial<Task>): void
}

export const TaskDialog: React.FC<Props> = ({ task, color, onClose, updateTask }) => {
  const complete = task.minutes === task.completedMinutes && task.minutes > 0

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
              {/* I couldn't freakin run exercise 2 with this code */}
              {/* <Minutes
                minutes={task?.minutes! || 0}
                onChange={(minutes: number) =>
                  updateTask({
                    minutes,
                    completedMinutes: Math.min(minutes, task.completedMinutes),
                  })
                }
              /> */}
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
                  onChange={(completedMinutes: number) => {
                    updateTask({ completedMinutes })
                  }}
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
