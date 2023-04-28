import { useState, useEffect } from 'react'
import { api } from 'spa/utils/api'
import type { CourseWithLessons } from 'spa/utils/types'

export function useCourses() {
  const [courses, setCourses] = useState<CourseWithLessons[] | null>(null)

  // Get All Courses
  useEffect(() => {
    let isCurrent = true
    api.courses.getAll().then((courses) => {
      if (!isCurrent) return
      setCourses(courses)
    })
    return () => {
      isCurrent = false
    }
  }, [])

  // Ask the instructor to cover `as const` which is a TypeScript thing
  return [courses, setCourses] as const
}
