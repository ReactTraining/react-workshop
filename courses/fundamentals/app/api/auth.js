// import { get, post } from './utils'

export function login() {
  const user = {
    name: 'Brad',
    github: 'bradwestfall',
  }
  return Promise.resolve(user)
}

export function getAvatarUrl(username) {
  return fetch(`https://api.github.com/users/${username}`)
    .then(res => res.json())
    .then(user => user.avatar_url)
}
