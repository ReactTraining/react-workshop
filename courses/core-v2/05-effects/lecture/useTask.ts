import { useEffect, useState } from 'react'
import { Task } from 'ProjectPlanner/types'
import { api } from 'ProjectPlanner/api2'

export function useTask(taskId: number) {
  const [task, setTask] = useState<Task | null>(null)

  // Do Effect Here

  return [task, setTask] as const
}
