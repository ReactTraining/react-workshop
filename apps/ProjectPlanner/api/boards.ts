import { get, post, put, httpDelete } from './utils'
import { format } from 'date-fns'
import {
  TaskGroup as TaskGroupType,
  Task as TaskType,
  Board as BoardType,
} from 'ProjectPlanner/types'

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

export function getBoards(userId: number): Promise<BoardType[]> {
  return get(`/boards?user=${userId}`)
}

export function getBoard(boardId: number): Promise<BoardType> {
  return get(`/boards/${boardId}?_embed=taskGroups`)
}

export function createBoard(userId: number): Promise<BoardType> {
  const defaultBoardData = {
    userId,
    name: '',
  }
  return post(`/boards`, defaultBoardData)
}

export async function updateBoard(
  boardId: number,
  data: Partial<BoardType> | null | undefined
): Promise<BoardType> {
  return put(`/boards/${boardId}`, data)
}

export function removeBoard(boardId: number): Promise<BoardType[]> {
  return httpDelete(`/boards/${boardId}`)
}

/**
 * Task Groups
 */

export function getTaskGroups(boardId: number): Promise<TaskGroupType[]> {
  return get(`/taskGroups?boardId=${boardId}`)
}

export function updateTaskGroup(
  groupId: number,
  data: Partial<TaskGroupType> | null | undefined
): Promise<TaskGroupType> {
  return put(`/taskGroups/${groupId}`, data)
}

export function updateTaskGroups(taskGroups: Partial<TaskGroupType>[]): Promise<TaskGroupType[]> {
  const p: Promise<TaskGroupType>[] = []
  taskGroups.forEach((group) => {
    if (group.id != null) {
      p.push(updateTaskGroup(group.id, group))
    }
  })

  // Since Promise.all() returns an array of each p's
  // results, and the response from each promise is the
  // corresponding taskGroup, we can pretend this was one
  // PUT call with a valid response of the data that changed
  return Promise.all(p)
}

export function createTaskGroup(boardId: number): Promise<TaskGroupType> {
  const defaultTaskGroupData = {
    boardId,
    name: '',
    taskIds: [],
  }
  return post(`/taskGroups`, defaultTaskGroupData)
}

export async function removeTaskGroup(taskGroupId: number): Promise<TaskGroupType[]> {
  const taskGroup = await getTaskGroup(taskGroupId)
  for (const taskId of taskGroup.taskIds || []) {
    await removeTask(taskId)
  }
  return await httpDelete(`/taskGroups/${taskGroupId}`)
}

export async function getTaskGroup(taskGroupId: number): Promise<TaskGroupType> {
  return await get(`/taskGroups/${taskGroupId}`)
}

/**
 * Tasks
 */

export function getTasks(boardId: number): Promise<TaskType[]> {
  return get(`/tasks?boardId=${boardId}`)
}

export function getTask(taskId: number): Promise<TaskType> {
  return get(`/tasks/${taskId}`)
}

export function createTask(boardId: number): Promise<TaskType> {
  const defaultTaskData = {
    boardId,
    name: '',
    content: '',
    minutes: 0,
    completedMinutes: 0,
    assignedTo: [],
    date: format(Date.now(), 'yyyy-MM-dd'),
  }
  return post(`/tasks`, defaultTaskData)
}

export async function createGroupedTask(boardId: number): Promise<[TaskType]>
export async function createGroupedTask(
  boardId: number,
  taskGroupId: number | null | undefined
): Promise<[TaskType] | [TaskType, TaskGroupType]>
export async function createGroupedTask(
  boardId: number,
  taskGroupId: number
): Promise<[TaskType, TaskGroupType]>

export async function createGroupedTask(boardId: number, taskGroupId?: number | null | undefined) {
  let newTask = await createTask(boardId)
  if (taskGroupId != null) {
    let taskGroup = await getTaskGroup(taskGroupId)
    let taskIds = taskGroup?.taskIds || []
    taskIds.push(newTask.id)
    const updatedTaskGroup = await updateTaskGroup(taskGroupId, { ...taskGroup, taskIds })
    return [newTask, updatedTaskGroup]
  }
  return [newTask]
}

export function updateTask(
  taskId: number,
  data: Partial<TaskType> | null | undefined
): Promise<TaskType> {
  return put(`/tasks/${taskId}`, data)
}

export function removeTask(taskId: number): Promise<TaskType[]> {
  return httpDelete(`/tasks/${taskId}`)
}
