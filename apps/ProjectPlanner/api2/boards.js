import { get, post, put, httpDelete } from './utils'
import { format } from 'date-fns'

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

export function getBoards(userId) {
  return get(`/boards?user=${userId}`)
}

export function getBoard(boardId) {
  return get(`/boards/${boardId}?_embed=taskGroups`)
}

export function createBoard(userId) {
  const defaultBoardData = {
    userId,
    name: '',
  }
  return post(`/boards`, defaultBoardData)
}

export async function updateBoard(boardId, data) {
  return put(`/boards/${boardId}`, data)
}

export function removeBoard(boardId) {
  return httpDelete(`/boards/${boardId}`)
}

/**
 * Task Groups
 */

export function getTaskGroups(boardId) {
  return get(`/taskGroups?boardId=${boardId}`)
}

export function updateTaskGroups(taskGroups) {
  const p = []
  taskGroups.forEach((group) => {
    p.push(put(`/taskGroups/${group.id}`, group))
  })

  // Since Promise.all() returns an array of each p's
  // results, and the response from each promise is the
  // corresponding taskGroup, we can pretend this was one
  // PUT call with a valid response of the data that changed
  return Promise.all(p)
}

export function createTaskGroup(boardId) {
  const defaultTaskGroupData = {
    boardId,
    name: '',
    taskIds: [],
  }
  return post(`/taskGroups`, defaultTaskGroupData)
}

export async function removeTaskGroup(taskGroupId, tasks) {
  const p = []
  tasks.forEach((taskId) => {
    p.push(httpDelete(`/tasks/${taskId}`))
  })

  // Cascade remove all related tasks
  await Promise.all(p)
  return httpDelete(`/taskGroups/${taskGroupId}`)
}

/**
 * Tasks
 */

export function getTasks(boardId) {
  return get(`/tasks?boardId=${boardId}`)
}

export function getTask(taskId) {
  return get(`/tasks/${taskId}`)
}

export function createTask(boardId) {
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

export function updateTask(taskId, task) {
  return put(`/tasks/${taskId}`, task)
}

export function removeTask(taskId) {
  return httpDelete(`/tasks/${taskId}`)
}
