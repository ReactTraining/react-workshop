import { useQuery, useMutation } from 'react-query'
import { api } from 'course-platform/utils/api'
import { queryClient } from './queryClient'
import type { CourseWithLessons } from 'course-platform/utils/types'

/**
 * Courses Data
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

/**
 * ✅ This is a working useCreateCourse. Yours can differ, as long as it works
 */
export function useCreateCourse() {
  type Data = { name: string; slug: string }
  const mutation = useMutation(({ name, slug }: Data) => api.courses.create(name, slug), {
    onSuccess: () => {
      queryClient.invalidateQueries('courses')
    },
  })
  return mutation.mutate
}

export function useRemoveCourse() {
  const mutation = useMutation((courseId: number) => api.courses.removeCourse(courseId), {
    mutationKey: 'courses',
    onSuccess: (_, courseId) => {
      // After a successful database mutation, update the local cache in the browser
      queryClient.setQueryData<CourseWithLessons[]>('courses', (cache) => {
        if (!cache) return []
        // They give us the old cache, we give them a new array. Provide
        // A function that decides what to remove
        return removeArrayItems(cache, (course: CourseWithLessons) => course.id === courseId)
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
