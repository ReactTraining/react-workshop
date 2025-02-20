import { get } from '../fetch-utils'
import type { Vacation } from '../types'

export function getAll(search = '') {
  return get<Vacation[]>(`/vacations?${search}`)
}

export function getVacation(id: number) {
  return get<Vacation>(`/vacations/${id}`)
}
