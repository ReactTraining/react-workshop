import { memo } from 'react'
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { useAuthContext } from 'course-platform/AuthContext'
import type { User } from 'course-platform/utils/types'

// Layouts
import { WebsiteLayout } from 'course-platform/WebsiteLayout'
import { AppLayout } from 'course-platform/AppLayout'
import { CoursesSubLayout, StudentsSubLayout, ChatSubLayout } from 'course-platform/AppSubLayouts'

// Pages
import { HomePage } from 'course-platform/HomePage'
import { WebsiteCourses } from 'course-platform/WebsiteCourses'
import { WebsiteCourseLessons } from 'course-platform/WebsiteCourseLessons'
import { WebsiteCourseLesson } from 'course-platform/WebsiteCourseLesson'
import { Login } from 'course-platform/Login'
import { Signup } from 'course-platform/Signup'
import { BrowseCourses } from 'course-platform/BrowseCourses'
import { BrowseCourseLessons } from 'course-platform/BrowseCourseLessons'
import { AddCourseForm } from 'course-platform/AddCourseForm'
import { LessonProfile } from 'course-platform/LessonProfile'
import { BrowseStudents } from 'course-platform/BrowseStudents'
import { ChatPage } from 'course-platform/ChatPage'

export const App = memo(() => {
  const { login } = useAuthContext()
  const navigate = useNavigate()
  const location = useLocation()

  function loginUserOnClient(user: User) {
    // This just sets global state for the client, the user should already
    // be logged in with a session elsewhere before calling this function
    login(user)
    navigate(location.state?.backTo?.pathname || '/admin')
  }

  return (
    <Routes>
      <Route path="/" element={<WebsiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<Login onSuccess={loginUserOnClient} />} />
        <Route path="signup" element={<Signup onSuccess={loginUserOnClient} />} />
        <Route path="courses" element={<WebsiteCourses />} />
        <Route path="courses/:courseSlug" element={<WebsiteCourseLessons />} />
        <Route path="courses/:courseSlug/:lessonSlug" element={<WebsiteCourseLesson />} />
      </Route>
      <Route path="admin" element={<AppLayout />}>
        <Route index element={<Navigate replace to="courses" />} />
        <Route path="courses" element={<CoursesSubLayout />}>
          <Route index element={<BrowseCourses />} />
          <Route path="add" element={<AddCourseForm />} />
          <Route path=":courseSlug" element={<BrowseCourseLessons />} />
          <Route path=":courseSlug/:lessonSlug" element={<LessonProfile />} />
        </Route>
        <Route path="students" element={<StudentsSubLayout />}>
          <Route index element={<BrowseStudents />} />
        </Route>
        <Route path="chat" element={<ChatSubLayout />}>
          <Route index element={<ChatPage />} />
        </Route>
      </Route>
    </Routes>
  )
})
