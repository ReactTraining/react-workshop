import { post } from './utils'

export function registerUser(data) {
  return post(`/users`, data)
}
