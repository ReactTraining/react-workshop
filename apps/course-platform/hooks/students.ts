import { useCallback } from 'react'
import { usePromise } from 'course-platform/usePromise'
import { api } from 'course-platform/utils/api'
import type { Student } from 'course-platform/utils/types'

export function useStudents() {
  const p = api.students.getAll
  const { results: students, ...rest } = usePromise<Student[]>(p)
  return { students, ...rest }
}

export function useStudent(studentId: number) {
  const getStudent = useCallback(() => api.students.getStudent(studentId), [studentId])
  const { results: student, ...rest } = usePromise<Student>(getStudent)
  return { student, ...rest }
}
