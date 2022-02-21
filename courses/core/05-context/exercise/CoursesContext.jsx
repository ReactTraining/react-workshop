import { createContext, useContext } from 'react'
import { useCourses } from './useCourses'

export const CoursesProvider = ({ children }) => {
  // const context = {
  //   refetch,
  //   isLoading,
  //   error,
  //   courses,
  //   getCourse(courseSlug) {
  //     return courses?.find((c) => c.slug === courseSlug)
  //   }
  // }

  return children // Return a provider wrapped around the children
}

export function useCoursesContext() {
  return {} // just a temporary return until you return the real context object
}
