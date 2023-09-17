import { usePromise } from '~/usePromise'
import { api } from 'react/_full-app/utils/api'
import type { CourseWithLessons } from 'react/_full-app/utils/types'

export function useCourses() {
  const p = api.courses.getAll
  const { results: courses, ...rest } = usePromise<CourseWithLessons[]>(p)
  return { courses, ...rest }
}
