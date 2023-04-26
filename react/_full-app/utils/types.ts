// export type Nullish = null | undefined | 0 | ''

export type User = {
  id: number
  name: string
  username: string
  avatarUrl: string | null
}

export type Course = {
  id: number
  name: string
  slug: string
}

export type CourseWithLessons = Course & {
  lessons: Lesson[]
}

export type Lesson = {
  id: number
  name: string
  slug: string
  courseSlug: string
  content: string
  draftContent: string
}

export type Student = {
  id: number
  name: string
  username: string
  password: string
  courses: number[]
}

export type ChatMessage = {
  id: string
  user: string
  userId: number
  text: string
  created: number
  avatarUrl: string
}
