import { createContext, useContext } from 'react'
import { useCourses } from './useCourses'
import type { CourseWithLessons, Lesson } from 'course-platform/utils/types'

type ContextType = {
  fetchCourses(): void
  isLoading: boolean
  error: string
  getCourses(): CourseWithLessons[] | undefined
  getCourse(slug: string): CourseWithLessons | undefined
  getLesson(courseId: string, lessonId: string): Lesson | undefined
}

const Context = createContext<ContextType>(null!)

export const CoursesProvider: React.FC = ({ children }) => {
  const { courses, isLoading, error, refetch } = useCourses()

  const context: ContextType = {
    fetchCourses: refetch,
    isLoading,
    error,
    getCourses() {
      return courses
    },
    getCourse(slug) {
      if (!courses) return
      return courses.find((c) => c.slug === slug)
    },
    getLesson(courseSlug, lessonSlug) {
      if (!courses) return
      const course = courses.find((c) => c.slug === courseSlug)
      if (!course || !Array.isArray(course.lessons) || course.lessons.length === 0) return
      return course.lessons.find((l) => l.slug === lessonSlug)
    },
  }

  return <Context.Provider value={context} children={children} />
}

export function useCoursesContext() {
  const context = useContext(Context)
  if (!context) {
    throw Error('Use of `useCourseContext` is outside of `CoursesProvider`')
  }
  return context || {}
}
