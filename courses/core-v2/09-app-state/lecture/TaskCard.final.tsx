import React, { useEffect } from 'react'
import { Heading } from 'ProjectPlanner/Heading'
import { TaskColor } from 'ProjectPlanner/TaskColor'
import { useBoardContext } from './BoardContext'
import 'ProjectPlanner/TaskCard.scss'

type Props = {
  taskId: number
  onClick(): void
}

export const TaskCard: React.FC<Props> = ({ taskId, onClick }) => {
  const { getTask } = useBoardContext()
  const [task, setTask] = useState()

  useEffect(() => {
    const task = getTask(taskId)
    if (task) setTask(task)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskId])

  return (
    <TaskColor task={task}>
      <div
        onClick={() => {
          onClick()
        }}
        className="task-card"
      >
        <div className="task-card-content spacing-small">
          <Heading size={3}>{task?.name}</Heading>
          <div className="task-card-content">{task?.content || <i>No Content</i>}</div>
        </div>
      </div>
    </TaskColor>
  )
}
