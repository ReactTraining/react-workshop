import { useQuery, useMutation } from 'react-query'
import { api } from 'course-platform/utils/api'
import { queryClient } from './queryClient'
import type { CourseWithLessons } from 'course-platform/utils/types'

/**
 * Hooks for Courses (Custom Abstraction)
 */

// export function useCourses() {
//   const p = api.courses.getAll
//   const { results: courses, ...rest } = usePromise<CourseWithLessons[]>(p)
//   return { courses, ...rest }
// }

/**
 * Hooks For Courses Data (React Query)
 */

export function useCourses() {
  const { data: courses, ...rest } = useQuery('courses', () => api.courses.getAll(), {
    staleTime: 1000 * 30,
  })
  return { courses, ...rest }
}

export function useCourse(courseSlug: string) {
  const { data: course, ...rest } = useQuery(
    ['course', courseSlug],
    () => api.courses.getCourse(courseSlug),
    {
      staleTime: 1000 * 30,
    }
  )
  return { course, ...rest }
}

export function useRemoveCourse() {
  const mutation = useMutation((courseId: number) => api.courses.removeCourse(courseId), {
    mutationKey: 'courses',
    onSuccess: (_, courseId) => {
      // After a successful database mutation, update the local cache in the browser
      queryClient.setQueryData<CourseWithLessons[]>('courses', (cache) => {
        if (!cache) return []
        const i = cache.findIndex((course: CourseWithLessons) => course.id === courseId)
        return [...cache.slice(0, i), ...cache.slice(i + 1)]

        // This would be nice (see below)
        // return removeArrayItems(cache, (course: CourseWithLessons) => course.id === courseId)
      })
    },
  })
  return mutation.mutate
}

/**
 * Immutable Utilities
 */

// TS Version
function removeArrayItems<T>(a: T[], cb: (x: T) => boolean) {
  const i = a.findIndex(cb)
  return [...a.slice(0, i), ...a.slice(i + 1)]
}

// // JS Version
// function removeArrayItems(a, cb) {
//   const i = a.findIndex(cb)
//   return [...a.slice(0, i), ...a.slice(i + 1)]
// }
