import { useState } from 'react'
import * as ReactDOM from 'react-dom/client'
import {
  Navigate,
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import { BrowseVacationsPage, loader as BrowseVacationsLoader } from '~/BrowseVacationsPage'
import { FavoriteProvider } from '~/FavoriteContext'
import { LessonBody, LessonCard } from '~/Lesson'
import { queryClient } from '~/utils/queryClient'

// Start Here
import { AccountSidebar } from './AccountSidebar'

// With useLayoutEffect
// import { AccountSidebar } from './AccountSidebar.final'

// With useSyncExternalStore
// import { AccountSidebar } from './AccountSidebar.final2'

function Layout() {
  const [width, setWidth] = useState(1200)
  return (
    <LessonBody>
      <div className="space-y-3 ml-auto mr-auto max-w-[1200px]">
        <div className="space-x-3">
          <button className="button" onClick={() => setWidth(1200)}>
            1200px
          </button>
          <button className="button" onClick={() => setWidth(1500)}>
            1500px
          </button>
        </div>
        <LessonCard>
          <div className="flex gap-6">
            <AccountSidebar width={width} />
            <main className="flex-1 min-h-[400px]">
              <Outlet />
            </main>
          </div>
        </LessonCard>
      </div>
    </LessonBody>
  )
}

// Most of this code is just here because <BrowseVacationsPage /> wants
// to make use of TabStack Query so we need the provider and router

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
