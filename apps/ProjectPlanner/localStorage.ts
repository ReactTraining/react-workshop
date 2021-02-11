import { User } from 'ProjectPlanner/types'

/**
 * Auth
 */

const LOCAL_STORAGE_KEY_AUTH = 'reacttraining-workshop-auth'

export function login(user: User) {
  localStorage.setItem(LOCAL_STORAGE_KEY_AUTH, JSON.stringify(user))
}

export function logout() {
  localStorage.setItem(LOCAL_STORAGE_KEY_AUTH, '')
}

export function getAuthenticatedUser() {
  try {
    const localStorageUser = localStorage.getItem(LOCAL_STORAGE_KEY_AUTH)
    if (!localStorageUser) return
    return JSON.parse(localStorageUser)
  } catch (e) {
    return
  }
}

/**
 * Recent Boards
 */

const LOCAL_STORAGE_KEY_RECENT_BOARDS = 'reacttraining-workshop-recent-boards'

export function setRecentBoard(boardId: number) {
  const recent = getRecentBoards()
  const newRecent = [boardId, ...recent.filter((bid) => bid !== boardId)].slice(0, 3)

  localStorage.setItem(LOCAL_STORAGE_KEY_RECENT_BOARDS, JSON.stringify(newRecent))
}

export function getRecentBoards(): number[] {
  try {
    const recent = localStorage.getItem(LOCAL_STORAGE_KEY_RECENT_BOARDS)
    if (!recent) return []
    return JSON.parse(recent)
  } catch (e) {
    return []
  }
}
