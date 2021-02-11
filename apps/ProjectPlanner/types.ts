export type Nullish = null | undefined | 0 | ''

export type User = {
  id: number
  accountId: number
  username: string
  name: string
  avatarUrl: string | null
}

export type Board = {
  id: number
  accountId: number
  name: string
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
  date: string
}
