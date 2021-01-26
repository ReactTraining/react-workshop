import React, { useState, useEffect, useContext } from 'react'
import classnames from 'classnames'
import { FaCheck, FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa'
import { api } from 'ProjectPlanner/api2'
import { Task } from 'ProjectPlanner/types'
import { useTaskColor } from 'ProjectPlanner/hooks/useTaskColor'
import { Dialog } from 'ProjectPlanner/Dialog'
import { Avatar } from 'ProjectPlanner/Avatar'
import { Heading } from 'ProjectPlanner/Heading'
import { Minutes } from 'ProjectPlanner/Minutes'
import { Progress } from 'ProjectPlanner/Progress'
import { BoardContext } from 'ProjectPlanner/Board'
import 'ProjectPlanner/TaskDialog.scss'

type Props = {
  taskId: number
  siblingTaskIds: number[]
  onChangeTaskId(taskId: number): void
  onClose(): void
}

/**
 * They left off in 3 by doing this component with a controlled form. Maybe we explain context
 * in #4 and in the process move the task data to an object. So that by the time they get here
 * we can rely on them knowing about updateTask. Then we can explain debouncing as a part of
 * useEffect
 */

export const TaskDialog: React.FC<Props> = ({
  taskId,
  siblingTaskIds,
  onChangeTaskId,
  onClose,
}) => {
  const [task, setTask] = useState<Task | null>(null)

  console.log('hererere')

  useEffect(() => {
    let isCurrent = true
    api.boards.getTask(taskId).then((task) => {
      if (isCurrent) {
        console.log(task)
        setTask(task)
      }
    })
    return () => {
      isCurrent = false
    }
  }, [taskId])

  const color = useTaskColor(task)
  const complete = (task && task.minutes === task.completedMinutes && task.minutes > 0) || false
  const i = siblingTaskIds.indexOf(taskId)
  const prevTaskId = i > 0 && siblingTaskIds[i - 1]
  const nextTaskId = i < siblingTaskIds.length - 1 && siblingTaskIds[i + 1]

  function update(partialTask: Partial<Task>) {
    if (!task) return
    setTask({ ...task, ...partialTask })
  }

  // useEffect(() => {
  //   if (edited && task) {
  //     const id = setTimeout(() => {
  //       update(task.id, { ...task, name: task.name.trim(), content: task.content.trim() })
  //     }, 400)
  //     return () => {
  //       clearTimeout(id)
  //     }
  //   }
  // }, [edited, task, update])

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
                  totalMinutes={task?.minutes || 0}
                  completedMinutes={task?.completedMinutes || 0}
                  color={color}
                  onChange={(completedMinutes) => update({ completedMinutes })}
                />
              )}
              <p className="text-small">
                {task && task.minutes === 0 && <i>Set Minutes First</i>}
                {task && task.minutes > 0 && (
                  <span style={{ color }}>
                    {((task?.completedMinutes! / task.minutes) * 100).toFixed(0)}% Complete
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
        <footer className="flex-split">
          <div className="horizontal-spacing">
            <button
              aria-label="Previous Task"
              disabled={!prevTaskId}
              className="prev-task"
              onClick={() => {
                if (prevTaskId) onChangeTaskId(prevTaskId)
              }}
            >
              <FaArrowCircleLeft />
            </button>
            <button
              aria-label="Next Task"
              disabled={!nextTaskId}
              className="next-task"
              onClick={() => {
                if (nextTaskId) onChangeTaskId(nextTaskId)
              }}
            >
              <FaArrowCircleRight />
            </button>
          </div>
          <div className="horizontal-spacing">
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
          </div>
        </footer>
      </div>
    </Dialog>
  )
}
