import { useEffect, useState } from 'react'
import { Task } from 'ProjectPlanner/types'
import { api } from 'ProjectPlanner/api'

export function useTask(taskId: number) {
  const [task, setTask] = useState<Task | null>(null)

  // Do Effect here

  // Ask instructor what "as const" does for us here
  return [task, setTask] as const
}
