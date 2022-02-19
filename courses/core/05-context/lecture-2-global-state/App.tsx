import { createContext, useState, useEffect, useCallback } from 'react'
import { api } from 'course-platform/utils/api'
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import type { User } from 'course-platform/utils/types'

// Layouts
import { WebsiteLayout } from './WebsiteLayout'
import { AppLayout } from './AppLayout'
import { CoursesSubLayout } from 'course-platform/AppSubLayouts'

// Pages
import { HomePage } from 'course-platform/HomePage'
import { Login } from 'course-platform/Login'
import { AddCourseForm } from 'course-platform/AddCourseForm'
import { BrowseCourses } from 'course-platform/BrowseCourses'
import { BrowseCourseLessons } from 'course-platform/BrowseCourseLessons'
import { LessonProfile } from 'course-platform/LessonProfile'

export function App() {
  const navigate = useNavigate()

  /****************************************
    Authentication
  *****************************************/

  // Keep track of the logged-in user
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)
  const [user, setUser] = useState<User | null>(null)

  const login = (user: User) => {
    setAuthenticated(true)
    setUser(user)

    // Redirect
    navigate('/admin')
  }

  function logout() {
    setAuthenticated(false)
    setUser(null)
  }

  useEffect(() => {
    let isCurrent = true
    api.auth.getAuthenticatedUser().then((user: User) => {
      if (user && isCurrent) {
        login(user)
      } else {
        logout()
      }
    })
    return () => {
      isCurrent = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /****************************************
    Router
  *****************************************/

  // prettier-ignore
  return (
    <Routes>
      <Route path="/" element={<WebsiteLayout authenticated={authenticated} user={user} logout={logout} />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<Login onSuccess={login} />} />
      </Route>
      <Route path="admin" element={<AppLayout authenticated={authenticated} user={user} logout={logout} />}>
        <Route index element={<Navigate replace to="courses" />} />
        <Route path="courses" element={<CoursesSubLayout />}>
          <Route index element={<BrowseCourses />} />
          <Route path="add" element={<AddCourseForm />} />
          <Route path=":courseSlug" element={<BrowseCourseLessons />} />
          <Route path=":courseSlug/:lessonSlug" element={<LessonProfile />} />
        </Route>
      </Route>
    </Routes>
  )
}
