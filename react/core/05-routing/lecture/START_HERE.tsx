import {
  BrowserRouter,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import { MainLayout } from '~/MainLayout'

const HomePage = () => <h1>Home Page</h1>
const PageOne = () => <h1>Page One</h1>
const PageTwo = () => <h1>Page Two</h1>

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index={true} element={<HomePage />} />
          <Route path="one" element={<PageOne />} />
          <Route path="two" element={<PageTwo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<MainLayout />}>
//       <Route index={true} element={<HomePage />} />
//       <Route path="one" element={<PageOne />} />
//       <Route path="two" element={<PageTwo />} />
//     </Route>
//   )
// )

// export function App() {
//   return <RouterProvider router={router} />
// }
