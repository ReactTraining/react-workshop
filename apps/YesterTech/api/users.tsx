import { post, get } from 'YesterTech/api/utils'
import { UserNoId, User, UserId } from 'YesterTech/types'

export async function registerUser(data: UserNoId): Promise<User> {
  return await post<User>(`/users`, data)
}

export function getUser(userId: UserId): Promise<User> {
  return get(`/users/${userId}`)
}
