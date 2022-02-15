import { get, post, patch, httpDelete } from '../fetch-utils'
import type { Student } from '../types'

/**
 * Students
 */

export function create(name: string, username: string) {
  return post<Student>(`/students`, { name, username, password: '', courses: [] })
}

export function getAll() {
  return get<Student[]>(`/students`)
}

export function getStudent(studentId: number) {
  return get<Student>(`/students/${studentId}`)
}

export function removeStudent(studentId: number) {
  return httpDelete<unknown>(`/students/${studentId}`)
}

export function updateCourses(studentId: number, courses: number[]) {
  return patch<unknown>(`/students/${studentId}`, { courses })
}
