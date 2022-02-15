import { Routes, Route, Navigate } from 'react-router-dom'
import 'course-platform/styles/all.scss'

// Layouts
import { AppLayout } from 'course-platform/AppLayout'
import { CoursesSubLayout } from 'course-platform/AppSubLayouts'

// Pages
import { AddCourseForm } from 'course-platform/AddCourseForm'
import { BrowseCourses } from 'course-platform/BrowseCourses'
import { BrowseCourseLessons } from 'course-platform/BrowseCourseLessons'
import { LessonProfile } from 'course-platform/LessonProfile'

export function App() {
  return (
    <Routes>
      <Route path="*" element={<div>Navigate to /admin</div>} />
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
