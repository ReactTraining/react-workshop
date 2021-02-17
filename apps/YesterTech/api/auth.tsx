import { get } from 'YesterTech/api/utils'
import * as storage from 'YesterTech/localStorage'
import { User, UserNoPassword, GitHubUser } from 'YesterTech/types'

// We use local storage to simulate the fact that these promise-based
// function calls would really be talking to a server that would probably
// set a session or JWT

export async function login(username: string, password: string): Promise<UserNoPassword> {
  const results = await get(`/users?username=${username}&password=${password}`)
  if (results.length > 0) {
    const { password, ...user }: User = results[0]
    storage.login(user)
    return user
  } else {
    return Promise.reject('User not found')
  }
}

export function getAuthenticatedUser(): Promise<UserNoPassword | undefined> {
  // In real life this would talk to the server
  const user = storage.getAuthenticatedUser()
  return Promise.resolve(user)
}

export function logout(): Promise<void> {
  // In real life this would talk to the server
  storage.logout()
  return Promise.resolve()
}

export async function getGitHubUser(username: string): Promise<GitHubUser> {
  try {
    const res = await fetch(`https://api.github.com/users/${username}`)
    if (res.status === 200) {
      return await res.json()
    } else {
      return await Promise.reject({
        status: res.status,
        statusText: res.statusText,
      })
    }
  } catch (err) {
    return Promise.reject(err)
  }
}
