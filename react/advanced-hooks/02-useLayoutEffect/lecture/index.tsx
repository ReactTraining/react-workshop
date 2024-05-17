import { useState } from 'react'
import * as ReactDOM from 'react-dom/client'
import {
  Navigate,
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { BrowseVacationsPage, loader as BrowseVacationsLoader } from '~/BrowseVacationsPage'
import { FavoriteProvider } from '~/FavoriteContext'
import { LessonBody, LessonCard } from '~/Lesson'
import { queryClient } from '~/utils/queryClient'
// import { AccountSidebar } from './AccountSidebar.final'
import { AccountSidebar } from './AccountSidebar'

function Layout() {
  return (
    <LessonBody>
      <LessonCard>
        <div className="flex gap-6">
          <AccountSidebar />
          <main className="flex-1 min-h-[400px]">
            <Outlet />
          </main>
        </div>
      </LessonCard>
    </LessonBody>
  )
}

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<BrowseVacationsPage />} loader={BrowseVacationsLoader} />
      <Route path="*" element={<Navigate to="/" />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <FavoriteProvider>
      <RouterProvider router={router} />
    </FavoriteProvider>
  </QueryClientProvider>
)
