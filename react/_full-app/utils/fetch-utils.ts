// Database API served by `json-server`
const baseURL = 'http://localhost:3333'

type Data = {
  [key: string]: any
}

function unpackResponse(res: Response) {
  if (res.ok) {
    return res.json()
  } else if (res.status === 404) {
    return Promise.reject('error 404')
  } else {
    return Promise.reject('Server Error: ' + res.status)
  }
}

export function get<T>(path: string): Promise<T> {
  return fetch(`${baseURL}${path}`).then(unpackResponse)
}

export function post<T>(path: string, data: Data): Promise<T> {
  return fetch(`${baseURL}${path}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(unpackResponse)
}

export function put<T>(path: string, data: Data): Promise<T> {
  return fetch(`${baseURL}${path}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(unpackResponse)
}

export function patch<T>(path: string, data: Data): Promise<T> {
  return fetch(`${baseURL}${path}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(unpackResponse)
}

export function httpDelete<T>(path: string): Promise<T> {
  return fetch(`${baseURL}${path}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(unpackResponse)
}
