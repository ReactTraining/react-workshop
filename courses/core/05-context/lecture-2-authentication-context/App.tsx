import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { useAuthContext } from './AuthContext'
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
  const { dispatch } = useAuthContext()

  function onLogin(user: User) {
    dispatch({ type: 'LOGIN', user })
    navigate('/admin')
  }

  // prettier-ignore
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
