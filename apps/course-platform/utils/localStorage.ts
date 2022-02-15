import type { User } from 'course-platform/utils/types'

/**
 * Auth
 */

const LOCAL_STORAGE_KEY_AUTH = 'reacttraining-workshop-auth'

export function login(user: User) {
  localStorage.setItem(LOCAL_STORAGE_KEY_AUTH, JSON.stringify(user))
}

export function logout() {
  localStorage.setItem(LOCAL_STORAGE_KEY_AUTH, '')
}

export function getAuthenticatedUser() {
  try {
    const localStorageUser = localStorage.getItem(LOCAL_STORAGE_KEY_AUTH)
    if (!localStorageUser) return
    return JSON.parse(localStorageUser)
  } catch (e) {
    return
  }
}

/**
 * Recent Lessons
 */

type LocalStorageLesson = {
  courseSlug: string
  lessonSlug: string
  lessonName: string
}

const LOCAL_STORAGE_KEY_RECENT_LESSONS = 'reacttraining-workshop-recent-lessons'

export function setRecentLesson(courseSlug: string, lessonSlug: string, lessonName: string) {
  const recent = getRecentLessons()
  const data: LocalStorageLesson = {
    courseSlug,
    lessonSlug,
    lessonName,
  }
  const newRecent = [
    data,
    ...recent.filter((item) => {
      return !(item.courseSlug === courseSlug && item.lessonSlug === lessonSlug)
    }),
  ].slice(0, 3)

  localStorage.setItem(LOCAL_STORAGE_KEY_RECENT_LESSONS, JSON.stringify(newRecent))
}

export function getRecentLessons(): LocalStorageLesson[] {
  try {
    const recent = localStorage.getItem(LOCAL_STORAGE_KEY_RECENT_LESSONS)
    if (!recent) return []
    return JSON.parse(recent)
  } catch (e) {
    return []
  }
}
