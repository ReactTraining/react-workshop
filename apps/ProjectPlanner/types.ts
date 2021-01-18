export type User = {
  id: number
  username: string
  name: string
  password: string
  avatarUrl: string | null
}

export type Board = {
  id: number
  userId: number
  name: string
  taskGroups: TaskGroup[]
}

export type TaskGroup = {
  id: number
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
