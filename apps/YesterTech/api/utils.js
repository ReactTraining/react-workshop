// Database API served by `json-server`
const baseURL = 'http://localhost:3333'

export function get(path) {
  return fetch(`${baseURL}${path}`).then(res => res.json())
}

export function getRaw(path) {
  return fetch(`${baseURL}${path}`)
}

export function post(path, data) {
  return fetch(`${baseURL}${path}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
}
