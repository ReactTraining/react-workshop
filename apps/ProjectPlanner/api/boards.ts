import { get, post, put, patch, httpDelete } from './utils'
import { format } from 'date-fns'
import { Board, TaskGroup, Task } from '../types'

/**
 * NOTICE
 *
 * Some of the work here would realistically be done server side
 * but we don't have a real server, we have a tool called json-server
 * which allows us to play with a JSON file as if it were a restful API
 */

/**
 * Boards
 */

export function createBoard(userId: number, name?: string) {
  const defaultBoardData = {
    userId,
    name: name || '',
  }
  return post<Board>(`/boards`, defaultBoardData)
}

export function getBoards(userId: number) {
  return get<Board[]>(`/boards?userId=${userId}`)
}

export function getBoard(boardId: number) {
  return get<Board>(`/boards/${boardId}?_embed=taskGroups&_embed=tasks`)
}

export async function updateBoard(boardId: number, data: Partial<Board>) {
  return patch<any>(`/boards/${boardId}`, data)
}

export function removeBoard(boardId: number) {
  return httpDelete<any>(`/boards/${boardId}`)
}

/**
 * Task Groups
 */

export function createTaskGroup(boardId: number, name?: string) {
  const defaultTaskGroupData = {
    name: name || '',
    boardId,
    taskIds: [],
  }
  return post<TaskGroup>(`/taskGroups`, defaultTaskGroupData)
}

export function getTaskGroups(boardId: number) {
  return get<TaskGroup[]>(`/taskGroups?boardId=${boardId}`)
}

export function updateTaskGroup(taskGroupId: number, data: Partial<TaskGroup>) {
  return patch<any>(`/taskGroups/${taskGroupId}`, data)
}

export function updateTaskGroups(taskGroups: TaskGroup[]) {
  const p: any = []
  taskGroups.forEach((group) => {
    p.push(put<any>(`/taskGroups/${group.id}`, group))
  })

  // Since Promise.all() returns an array of each p's
  // results, and the response from each promise is the
  // corresponding taskGroup, we can pretend this was one
  // PUT call with a valid response of the data that changed
  return Promise.all(p)
}

export async function removeTaskGroup(taskGroupId: number) {
  const taskGroup: TaskGroup = await get(`/taskGroups/${taskGroupId}`)
  await httpDelete<any>(`/taskGroups/${taskGroupId}`)

  const p: any[] = []
  taskGroup.taskIds.forEach((taskId) => {
    p.push(httpDelete<any>(`/tasks/${taskId}`))
  })

  // Cascade remove all related tasks
  await Promise.all(p)
}

/**
 * Tasks
 */

export function getTasks(boardId: number) {
  return get<Task[]>(`/tasks?boardId=${boardId}`)
}

export function getTask(taskId: number) {
  return get<Task>(`/tasks/${taskId}`)
}

export async function createTask(boardId: number, taskGroupId: number, data?: Partial<Task>) {
  const defaultTaskData = {
    name: '',
    content: '',
    minutes: 0,
    completedMinutes: 0,
    assignedTo: [],
    ...data,
    boardId,
    date: format(Date.now(), 'yyyy-MM-dd'),
  }
  const task: Task = await post<Task>(`/tasks`, defaultTaskData)
  // Get task group so we can add this new task.id to it
  const taskGroup = await get<TaskGroup>(`/taskGroups/${taskGroupId}`)
  const newTaskIds = taskGroup.taskIds.concat(task.id)
  await patch<any>(`/taskGroups/${taskGroupId}`, { taskIds: newTaskIds })
  return task
}

export function updateTask(taskId: number, task: Task) {
  return put(`/tasks/${taskId}`, task)
}

export async function removeTask(boardId: number, taskId: number) {
  await httpDelete(`/tasks/${taskId}`)
  const taskGroups: TaskGroup[] = await get(`/taskGroups/?boardId=${boardId}`)
  const newTaskGroups = taskGroups.map((taskGroup) => {
    return { ...taskGroup, taskIds: taskGroup.taskIds.filter((id) => id !== taskId) }
  })
  await updateTaskGroups(newTaskGroups)
  return null
}
