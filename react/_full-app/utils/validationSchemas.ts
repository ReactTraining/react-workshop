import * as yup from 'yup'

export const schemas = {
  // Courses and Lessons
  courseName: yup.string().max(100, 'Cannot be more than 100 characters'),
  lessonName: yup.string().max(100, 'Cannot be more than 100 characters'),
  slug: yup.string().matches(/^[a-zA-Z0-9\-]+$/, 'Only Letters, Numbers and Hyphens'),

  // Students
  studentName: yup.string(),

  // Users
  fullName: yup.string().max(40, 'Cannot be more than 40 characters'),
  username: yup
    .string()
    .matches(/^[a-zA-Z0-9\-]+$/, 'Only Letters, Numbers and Hyphens')
    .min(6, 'Must be at least 6 characters')
    .max(100, 'Cannot be more than 100 characters'),
  password: yup
    .string()
    .min(6, 'Must be at least 6 characters')
    .max(100, 'Cannot be more than 100 characters'),
}
