import { get } from './utils'

export function login(username, password) {
  return get(`/users?username=${username}&password=${password}`).then(results => {
    if (results.length > 0) {
      const user = results[0]
      delete user.password
      return user
    } else {
      return Promise.reject('User not found')
    }
  })
}

export function getGithubUser(username) {
  return fetch(`https://api.github.com/users/${username}`).then(res => res.json())
}
