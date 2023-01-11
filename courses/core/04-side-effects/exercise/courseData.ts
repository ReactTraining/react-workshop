import { useState, useEffect } from 'react'
import { api } from 'course-platform/utils/api'
import type { CourseWithLessons } from 'course-platform/utils/types'

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

  return [courses, setCourses]
}
