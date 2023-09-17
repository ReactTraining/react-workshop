import { memo } from 'react'
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { useAuthContext } from '~/AuthContext'
import type { User } from 'react/_full-app/utils/types'

// Layouts
import { WebsiteLayout } from '~/WebsiteLayout'
import { AppLayout } from '~/AppLayout'
import { CoursesSubLayout, StudentsSubLayout, ChatSubLayout } from '~/AppSubLayouts'

// Pages
import { HomePage } from '~/HomePage'
import { WebsiteCourses } from '~/WebsiteCourses'
import { WebsiteCourseLessons } from '~/WebsiteCourseLessons'
import { WebsiteCourseLesson } from '~/WebsiteCourseLesson'
import { Login } from '~/Login'
import { Signup } from '~/Signup'
import { BrowseCourses } from '~/BrowseCourses'
import { BrowseCourseLessons } from '~/BrowseCourseLessons'
import { AddCourseForm } from '~/AddCourseForm'
import { LessonProfile } from '~/LessonProfile'
import { BrowseStudents } from '~/BrowseStudents'
import { ChatPage } from '~/ChatPage'

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
