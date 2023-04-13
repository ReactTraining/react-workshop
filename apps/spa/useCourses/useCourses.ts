import { usePromise } from 'spa/usePromise'
import { api } from 'spa/utils/api'
import type { CourseWithLessons } from 'spa/utils/types'

export function useCourses() {
  const p = api.courses.getAll
  const { results: courses, ...rest } = usePromise<CourseWithLessons[]>(p)
  return { courses, ...rest }
}
