import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import 'course-platform/styles/all.scss'
import { AppLayout } from 'course-platform/AppLayout'

// import { ChatPage } from 'course-platform/ChatPage.final'
import { ChatPage } from 'course-platform/ChatPage'

export function App() {
  return (
    <Routes>
      <Route path="admin" element={<AppLayout />}>
        <Route path="chat">
          <Route index element={<ChatPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate replace to="/admin/chat" />} />
    </Routes>
  )
}
