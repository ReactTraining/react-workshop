import { post } from './utils'
import { User } from '../types'

export function registerUser(user: Exclude<User, 'id'>) {
  return post(`/users`, user)
}
