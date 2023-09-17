import { useState, useEffect } from 'react'
import { api } from 'react/_full-app/utils/api'
import type { CourseWithLessons } from 'react/_full-app/utils/types'

export function useCourses() {
  const [courses, setCourses] = useState<CourseWithLessons[] | null>(null)

  // Put side effect here that was used in both BrowseCourses and PreviousNextCourse

  // Ask the instructor to cover `as const` which is a TypeScript thing
  return [courses, setCourses] as const
}
