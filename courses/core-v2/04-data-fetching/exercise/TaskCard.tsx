import React, { useState, useRef, useLayoutEffect } from 'react'
import { useCSSPropertyRef } from 'ProjectPlanner/hooks/useCSSPropertyRef'
import { Heading } from 'ProjectPlanner/Heading'
import { TaskDialog } from './TaskDialog'
import { Task } from './types'
import 'ProjectPlanner/TaskCard.scss'

const brightBlue = '#04b3ff'
const green = '#4dd579'
const red = '#ff5656'

export const TaskCard: React.FC = () => {
  const [expanded, setExpanded] = useState(false)

  const [task, setTask] = useState<Task>({
    name: 'Name',
    content: 'Content',
    minutes: 0,
    completedMinutes: 0,
  })

  function updateTask(partialTask: Partial<Task>) {
    setTask({ ...task, ...partialTask })
  }

  let color = brightBlue
  if (task.completedMinutes === 0) {
    color = red
  } else if (task.completedMinutes >= task.minutes) {
    color = green
  }

  const taskCardRef = useRef<HTMLDivElement>(null!)
  useLayoutEffect(() => {
    if (taskCardRef.current) {
      taskCardRef.current.style.setProperty(`--taskColor`, color)
    }
  }, [color])

  return (
    <div
      onClick={() => {
        setExpanded(true)
      }}
    >
      {task && expanded && (
        <TaskDialog
          onClose={() => setExpanded(false)}
          color={color}
          task={task}
          updateTask={updateTask}
        />
      )}
      {task && (
        <div ref={taskCardRef} className="task-card">
          <div className="task-card-content spacing-small">
            {task && <Heading size={3}>{task.name}</Heading>}
            <div className="task-card-content">
              {!task?.content ? <i>No Content</i> : task.content}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
