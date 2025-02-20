import { get } from '../fetch-utils'
import * as storage from '../localStorage'
import { User } from '../types'

// We use local storage to simulate the fact that these promise-based
// function calls would really be talking to a server that would probably
// set a session or JWT

type DatabaseUser = User & { password?: string }

export function login(username: string, password: string) {
  return get<DatabaseUser[]>(`/users?username=${username}&password=${password}`).then((results) => {
    if (results.length > 0) {
      const user = results[0]
      delete user.password
      storage.login(user)
      return user as User
    } else {
      return Promise.reject('User not found')
    }
  })
}

export function getAuthenticatedUser() {
  // In real life this would talk to the server
  const user = storage.getAuthenticatedUser()
  return Promise.resolve(user)
}

export function logout() {
  // In real life this would talk to the server
  storage.logout()
  return Promise.resolve()
}

export function getGitHubUser(username: string) {
  return fetch(`https://api.github.com/users/${username}`).then((res) => res.json())
}
