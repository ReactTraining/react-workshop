import { useState } from 'react'
// import {
//   BrowserRouter,
//   Route,
//   RouterProvider,
//   Routes,
//   createBrowserRouter,
//   createRoutesFromElements,
// } from 'react-router-dom'
// import { MainLayout } from '~/MainLayout'

type Props = { children: React.ReactNode }

function MainLayout({ children }: Props) {
  return (
    <div>
      <header></header>
      <main>{children}</main>
      <footer></footer>
    </div>
  )
}

const HomePage = () => <h1>Home Page</h1>
const PageOne = () => <h1>Page One</h1>
const PageTwo = () => <h1>Page Two</h1>

export function App() {
  const [page, setPage] = useState('/')

  return (
    <MainLayout>
      {page === '/' && <HomePage />}
      {page === '/one' && <PageOne />}
      {page === '/two' && <PageTwo />}
    </MainLayout>
  )
}

/**
 * Basic React Router 6 Example: With JSX routes
 */

// export function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<MainLayout />}>
//           <Route index={true} element={<HomePage />} />
//           <Route path="one" element={<PageOne />} />
//           <Route path="two" element={<PageTwo />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   )
// }
