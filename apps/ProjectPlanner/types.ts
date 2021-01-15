export type User = {
  userId: number
  username: string
  name: string
  password: string
  avatarUrl: string | null
}

export type TaskGroup = {
  taskGroupId: number
  name: string
  taskIds: number[]
}

export type Task = {
  id: number
  boardId: number
  name: string
  content: string
  minutes: number
  completedMinutes: number
  assignedTo: number[]
}

export type Board = {
  id: number
  userId: number
  name: string
  taskGroups: TaskGroup[]
}
