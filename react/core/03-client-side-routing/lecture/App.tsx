// import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import 'spa/styles/all.scss'
import './styles.scss'

// A fun React Router Demo by @DilumSanjaya
// https://remix-routing-demo.netlify.app/invoices

// Layouts
import { WebsiteLayout } from './WebsiteLayout'
import { AppLayout, AppSubLayout } from './AppLayout'

// Pages
import { HomePage } from 'spa/HomePage'
import { BrowseCourses } from './BrowseCourses'
import { BrowseStudents } from 'spa/BrowseStudents'
import { ChatPage } from 'spa/ChatPage'

// Let's Lazy load this
import BrowseCourseLessons from './BrowseCourseLessons'

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
          <Route path="students">
            <Route index element={<BrowseStudents />} />
          </Route>
          <Route path="chat">
            <Route index element={<ChatPage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}
