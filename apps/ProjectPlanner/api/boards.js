import { get, post, put, httpDelete } from './utils'

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
    name: 'Untitled',
  }
  return post(`/boards`, defaultBoardData)
}

export async function updateBoard(boardId, data) {
  const taskGroupData = data.taskGroups
  delete data.taskGroups

  const p = []
  p.push(put(`/boards/${boardId}`, data))

  taskGroupData.forEach((group) => {
    p.push(put(`/taskGroups/${group.id}`, group))
  })

  return Promise.all(p).then((results) => {
    const [boardResults, ...taskGroupResults] = results
    return { ...boardResults, taskGroups: taskGroupResults }
  })
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
