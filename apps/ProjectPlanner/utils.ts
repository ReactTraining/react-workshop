/****************************************
  HTTP Requests (fetch)
*****************************************/

// Database API served by `json-server`
const baseURL = 'http://localhost:3333'

type Data = {
  [key: string]: any
}

export function get<T>(path: string): Promise<T> {
  return fetch(`${baseURL}${path}`).then((res) => res.json())
}

export function getRaw(path: string) {
  return fetch(`${baseURL}${path}`)
}

export function post<T>(path: string, data: Data): Promise<T> {
  return fetch(`${baseURL}${path}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json())
}

export function put<T>(path: string, data: Data): Promise<T> {
  return fetch(`${baseURL}${path}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json())
}

export function patch<T>(path: string, data: Data): Promise<T> {
  return fetch(`${baseURL}${path}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json())
}

export function httpDelete<T>(path: string): Promise<T> {
  return fetch(`${baseURL}${path}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json())
}

/****************************************
  Arrays
*****************************************/

export function shuffle(array: any[]): any[] {
  if (!array || array.length === 0) return []
  let currentIndex = array.length,
    temporaryValue,
    randomIndex

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}
