import {
  BrowserRouter,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import { MainLayout } from './MainLayout'

function HomePage() {
  return <h1>Home Page</h1>
}

function PageOne() {
  return <h1>Page One</h1>
}

function PageTwo() {
  return <h1>Page Two</h1>
}

/**
 * Without A Router
 */

// export function App() {
//   const page = 'one'

//   return (
//     <MainLayout>
//       {page === 'home' && <HomePage />}
//       {page === 'one' && <PageOne />}
//       {page === 'two' && <PageTwo />}
//     </MainLayout>
//   )
// }

/**
 * Basic React Router 6 Example: With JSX routes
 */

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index={true} element={<HomePage />}></Route>
          <Route path="one" element={<PageOne />}></Route>
          <Route path="two" element={<PageTwo />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

/**
 * Basic React Router 6 Example: No JSX
 */

// function App() {
//   <RouterProvider router={router} />
// }
// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <MainLayout />,
//     children: [
//       {
//         index: true,
//         element: <PageOne />,
//       },
//       {
//         path: 'two',
//         element: <PageTwo />,
//       },
//     ],
//   },
// ])
