import { get } from './utils'

export function login(username, password) {
  return get(`/users?username=${username}&password=${password}`).then(results => {
    if (results.length === 1) {
      return results[0]
    } else {
      return Promise.reject('User not found')
    }
  })
}

export function getGithubUser(username) {
  return fetch(`https://api.github.com/users/${username}`).then(res => res.json())
}
