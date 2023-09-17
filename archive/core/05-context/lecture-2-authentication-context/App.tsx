import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useAuthContext } from './AuthContext'
import type { User } from 'react/_full-app/utils/types'

// Layouts
import { WebsiteLayout } from './WebsiteLayout'
import { AppLayout } from './AppLayout'
import { CoursesSubLayout } from '~/AppSubLayouts'

// Pages
import { HomePage } from '~/HomePage'
import { Login } from '~/Login'
import { AddCourseForm } from '~/AddCourseForm'
import { BrowseCourses } from '~/BrowseCourses'
import { BrowseCourseLessons } from '~/BrowseCourseLessons'
import { LessonProfile } from '~/LessonProfile'

export function App() {
  const navigate = useNavigate()
  const { dispatch } = useAuthContext()

  function onLogin(user: User) {
    dispatch({ type: 'LOGIN', user })
    navigate('/admin')
  }

  return (
    <Routes>
      <Route path="/" element={<WebsiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<Login onSuccess={onLogin} />} />
      </Route>
      <Route path="admin" element={<AppLayout />}>
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
