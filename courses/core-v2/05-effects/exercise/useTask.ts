import { useEffect, useState } from 'react'
import { Task } from 'ProjectPlanner/types'
import { api } from 'ProjectPlanner/api'

export function useTask(taskId: number) {
  const [task, setTask] = useState<Task | null>(null)

  useEffect(() => {
    let isCurrent = true
    api.boards.getTask(taskId).then((task) => {
      if (isCurrent) {
        setTask(task)
      }
    })
    return () => {
      isCurrent = false
    }
  }, [taskId])

  // Ask instructor what "as const" does for us here
  return [task, setTask] as const
}
