import { get, post, patch, httpDelete } from '../fetch-utils'
import type { Course, CourseWithLessons, Lesson, LessonContent } from '../types'

/**
 * Courses
 */

export function create(name: string, slug: string) {
  return post<Course>(`/courses`, { name, slug })
}

export function getAll() {
  return get<CourseWithLessons[]>(`/courses?_embed=lessons`)
}

export function getCourse(courseSlug: string) {
  return get<CourseWithLessons[]>(`/courses?slug=${courseSlug}&_embed=lessons`).then((courses) => {
    // We have to do this because the REST API expects that if we query courses like this
    // that we can get multiple back. But I want this getCourse function to feel like it only
    // returns one course
    return courses[0]
  })
}

// export function getCourseLessons(courseSlug: string) {
//   return get<Lesson[]>(`/lessons?courseSlug=${courseSlug}`)
// }

export function removeCourse(courseId: number) {
  return httpDelete<unknown>(`/courses/${courseId}`)
}

/**
 * Lessons
 */

export async function createLesson(
  courseId: number,
  name: string,
  slug: string,
  courseSlug: string
) {
  const newLesson = await post<Lesson>(`/lessons`, { courseId, name, slug, courseSlug })
  await post<LessonContent>(`/lesson-content/`, { id: newLesson.id, content: '', draftContent: '' })
  return newLesson
}

export async function removeLesson(lessonId: number) {
  await httpDelete<unknown>(`/lessons/${lessonId}`)
  await httpDelete<unknown>(`/lesson-content/${lessonId}`)
}

export function saveLessonContent(lessonId: number, content: string, draft = false) {
  if (draft) {
    return patch<unknown>(`/lessons/${lessonId}`, { draftContent: content })
  } else {
    return patch<unknown>(`/lessons/${lessonId}`, { draftContent: '', content })
  }
}
