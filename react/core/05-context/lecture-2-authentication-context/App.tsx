import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useAuthContext } from './AuthContext'
import type { User } from 'spa/utils/types'

// Layouts
import { WebsiteLayout } from './WebsiteLayout'
import { AppLayout } from './AppLayout'
import { CoursesSubLayout } from 'spa/AppSubLayouts'

// Pages
import { HomePage } from 'spa/HomePage'
import { Login } from 'spa/Login'
import { AddCourseForm } from 'spa/AddCourseForm'
import { BrowseCourses } from 'spa/BrowseCourses'
import { BrowseCourseLessons } from 'spa/BrowseCourseLessons'
import { LessonProfile } from 'spa/LessonProfile'

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
