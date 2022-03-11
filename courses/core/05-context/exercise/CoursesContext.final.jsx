import { createContext, useContext } from 'react'
import { useCourses } from './useCourses'

const Context = createContext()

export const CoursesProvider = ({ children }) => {
  const { courses, isLoading, refetch } = useCourses()

  const context = {
    refetch,
    isLoading,
    courses,
    getCourse(courseSlug) {
      return courses?.find((c) => c.slug === courseSlug)
    },
    getLesson(courseSlug, lessonSlug) {
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
