import { get, post, put, httpDelete } from './utils'

/**
 * Boards
 */

export function getBoards(userId) {
  return get(`/boards?user=${userId}`)
}

export function getBoard(boardId) {
  return get(`/boards/${boardId}`)
}

export function createBoard(userId) {
  const defaultBoardData = {
    userId,
    name: 'Untitled',
    taskGroups: [],
  }
  return post(`/boards`, defaultBoardData)
}

export function updateBoard(boardId, data) {
  return put(`/boards/${boardId}`, data)
}

export function removeBoard(boardId) {
  return httpDelete(`/boards/${boardId}`)
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
  }
  return post(`/tasks`, defaultTaskData)
}

export function updateTask(taskId, task) {
  return put(`/tasks/${taskId}`, task)
}

export function removeTask(taskId) {
  return httpDelete(`/tasks/${taskId}`)
}
