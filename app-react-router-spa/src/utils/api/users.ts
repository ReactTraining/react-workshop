import { post, get, patch } from '../fetch-utils'
import * as storage from '../localStorage'
import { User } from '../types'

type DatabaseUser = User & { password?: string }

export async function registerUser(user: Omit<DatabaseUser, 'id'>): Promise<User> {
  const newUser = await post<DatabaseUser>(`/users`, user)

  // Log them in (which we fake with localStorage)
  delete newUser.password
  storage.login(newUser)

  return newUser
}

export async function getAccountUsers(): Promise<User[]> {
  return get<DatabaseUser[]>(`/users`).then((users) =>
    users.map((u) => {
      delete u.password
      return u
    })
  )
}

export async function getUser(userId: number): Promise<User> {
  return get<DatabaseUser>(`/users/${userId}`).then((user) => {
    delete user.password
    return user
  })
}

export async function getUsersByIds(ids: number[]): Promise<User[]> {
  if (ids.length === 0) return Promise.resolve([])
  return get<DatabaseUser[]>(`/users?id=${ids.join('&id=')}`).then((users) =>
    users.map((u) => {
      delete u.password
      return u
    })
  )
}

export async function saveSearch(userId: number, search: string) {
  await post(`/searches`, { userId, searchString: search })
  return true
}
