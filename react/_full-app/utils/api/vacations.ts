import { get, post, patch, httpDelete } from '../fetch-utils'
import type { Vacation } from '../types'
import { queryClient } from '../queryClient'

/**
 * Courses
 */

// export function create(name: string, slug: string) {
//   return post<Course>(`/courses`, { name, slug })
// }

export function getAll(search = '') {
  return get<Vacation[]>(`/vacations?${search}`)
}

export async function getAllCached(search = '') {
  const vacation = await queryClient.ensureQueryData({
    queryKey: ['vacations'],
    queryFn: () => getAll(search),
    staleTime: 1000 * 30,
  })
  return vacation
}

export function getVacation(id: number) {
  return get<Vacation>(`/vacations/${id}`)
}

export async function getVacationCached(id: number) {
  const vacation = await queryClient.ensureQueryData({
    queryKey: ['vacation', id],
    queryFn: () => getVacation(id),
    staleTime: 1000 * 30,
  })
  return vacation
}

// export function removeCourse(courseId: number) {
//   return httpDelete<unknown>(`/courses/${courseId}`)
// }

// export async function createLesson(
//   courseId: number,
//   name: string,
//   slug: string,
//   courseSlug: string
// ) {
//   const newLesson = await post<Lesson>(`/lessons`, { courseId, name, slug, courseSlug })
//   await post<LessonContent>(`/lesson-content/`, { id: newLesson.id, content: '', draftContent: '' })
//   return newLesson
// }

// export async function removeLesson(lessonId: number) {
//   await httpDelete<unknown>(`/lessons/${lessonId}`)
//   await httpDelete<unknown>(`/lesson-content/${lessonId}`)
// }

// export function saveLessonContent(lessonId: number, content: string, draft = false) {
//   if (draft) {
//     return patch<unknown>(`/lessons/${lessonId}`, { draftContent: content })
//   } else {
//     return patch<unknown>(`/lessons/${lessonId}`, { draftContent: '', content })
//   }
// }
