import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { TaskGroup } from './TaskGroup'
import { Heading } from 'ProjectPlanner/Heading'
import { useBoard, useTaskGroups } from 'ProjectPlanner/hooks/dataHooks'
import { Task } from 'ProjectPlanner/types'
import { api } from 'ProjectPlanner/api2'
import 'ProjectPlanner/Board.scss'

export const Board: React.FC = () => {
  const boardId = parseInt(useParams<{ boardId: string }>().boardId)
  const [board] = useBoard(boardId)
  const [taskGroups] = useTaskGroups(boardId)

  // const [tasks, setTasks] = useState<Task[] | null>(null)

  // useEffect(() => {
  //   let isCurrent = true
  //   api.boards.getTasks(boardId).then((tasks) => {
  //     if (isCurrent) {
  //       setTasks(tasks)
  //     }
  //   })
  //   return () => {
  //     isCurrent = false
  //   }
  // }, [boardId])

  // const getTask = (taskId: number): Task | undefined => {
  //   return tasks?.find((task) => task.id === taskId)
  // }

  // const updateTask = (taskId: number, task: Task): void => {
  //   api.boards.updateTask(taskId, task).then(() => {
  //     if (!tasks) return
  //     const i = tasks.findIndex((t) => t.id === taskId)
  //     setTasks([...tasks.slice(0, i), task, ...tasks.slice(i, tasks.length)])
  //   })
  // }

  return (
    <div className="board spacing">
      <Heading style={{ minWidth: '25rem' }}>{board?.name}</Heading>

      <div className="board-scroll-area">
        {taskGroups &&
          taskGroups.map((taskGroup) => {
            return (
              <div className="task-group-wrap" key={taskGroup.id}>
                <TaskGroup name={taskGroup.name} taskIds={taskGroup.taskIds} />
              </div>
            )
          })}
      </div>
    </div>
  )
}
