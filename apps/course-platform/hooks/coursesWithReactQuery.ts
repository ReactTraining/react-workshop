// import { useQuery, useMutation } from 'react-query'
// import { api } from '../utils/api'
// import { queryClient } from '../utils/queryClient'
// // import type { Course } from '../utils/types'
// import * as immutableCollection from '../utils/immutableCollection'

// /**
//  * Courses
//  */

// export function useCourses() {
//   const {
//     data: courses,
//     isLoading,
//     error,
//   } = useQuery('courses', () => api.courses.getAll(), {
//     staleTime: 1000 * 30,
//   })
//   return { courses, isLoading, error }
// }

// export function useCreateCourse() {
//   const mutation = useMutation((courseId) => api.courses.removeCourse(courseId), {
//     onSuccess: (_, courseId) => {
//       queryClient.setQueryData('courses', (old) => {
//         return immutableCollection.remove(old, (course: any) => course.id === courseId)
//       })
//     },
//   })
//   return mutation.mutate
// }

// export function useRemoveCourse() {
//   const mutation = useMutation((courseId) => api.courses.removeCourse(courseId), {
//     onSuccess: (_, courseId) => {
//       queryClient.setQueryData('courses', (old) => {
//         return immutableCollection.remove(old, (course: any) => course.id === courseId)
//       })
//     },
//   })
//   return mutation.mutate
// }

// export function useCourse(courseId: number) {
//   const {
//     data: course,
//     isLoading,
//     error,
//   } = useQuery(['course', courseId], () => api.courses.getCourse(courseId), {
//     staleTime: 1000 * 30,
//   })
//   return { course, isLoading, error }
// }

// export function useCourseLessons(courseId: number) {
//   const {
//     data: lessons,
//     isLoading,
//     error,
//   } = useQuery(['course-lessons', courseId], () => api.courses.getCourseLessons(courseId), {
//     staleTime: 1000 * 30,
//   })
//   return { lessons, isLoading, error }
// }
