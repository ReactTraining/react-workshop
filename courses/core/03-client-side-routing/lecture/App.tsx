import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import 'course-platform/styles/all.scss'
import './styles.scss'

// A fun React Router Demo by @DilumSanjaya
// https://remix-routing-demo.netlify.app/invoices

// Layouts
import { WebsiteLayout } from 'course-platform/WebsiteLayout'
import { AppLayout } from 'course-platform/AppLayout'
// import { CoursesSubLayout } from 'course-platform/AppSubLayout'

// Pages
import { HomePage } from 'course-platform/HomePage'
import { BrowseCourses } from 'course-platform/BrowseCourses'
import { BrowseCourseLessons } from 'course-platform/BrowseCourseLessons'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WebsiteLayout />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="admin" element={<AppLayout />}>
          <Route index element={<Navigate replace to="courses" />} />
          <Route path="courses">
            <Route index element={<BrowseCourses />} />
            <Route path=":courseSlug" element={<BrowseCourseLessons />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

// URL: localhost:3000
// Component Tree:
// function App() {
//   return (
//     <WebsiteLayout>
//       <HomePage />
//     </WebsiteLayout>
//   )
// }

// URL: localhost:3000/admin/courses/react
// Component Tree:
// function App() {
//   return (
//     <AppLayout>
//       <AppSubLayout>
//         <BrowseCourseLessons />
//       </AppSubLayout>
//     </AppLayout>
//   )
// }
