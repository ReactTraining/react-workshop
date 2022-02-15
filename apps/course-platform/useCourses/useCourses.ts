import { usePromise } from 'course-platform/usePromise'
import { api } from 'course-platform/utils/api'
import type { CourseWithLessons } from 'course-platform/utils/types'

export function useCourses() {
  const p = api.courses.getAll
  const { results: courses, ...rest } = usePromise<CourseWithLessons[]>(p)
  return { courses, ...rest }
}
