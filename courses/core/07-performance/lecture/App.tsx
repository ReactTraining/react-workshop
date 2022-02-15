import { Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout } from 'course-platform/AppLayout'
// import { BrowseCourses } from './BrowseCourses.final'
import { BrowseCourses } from './BrowseCourses'
import 'course-platform/styles/all.scss'

export function App() {
  return (
    <Routes>
      <Route path="*">
        <Route index element={<Navigate replace to="/admin/courses" />} />
      </Route>
      <Route path="admin" element={<AppLayout />}>
        <Route path="courses" element={<BrowseCourses />} />
      </Route>
    </Routes>
  )
}
