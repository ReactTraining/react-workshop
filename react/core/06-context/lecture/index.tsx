import * as ReactDOM from 'react-dom/client'

// Start Here
import { App } from './hello-world'
ReactDOM.createRoot(document.getElementById('root')!).render(<App />)

// import { useState } from 'react'
// import {
//   RouterProvider,
//   Navigate,
//   Route,
//   createBrowserRouter,
//   createRoutesFromElements,
// } from 'react-router-dom'
// import { QueryClientProvider } from '@tanstack/react-query'
// import { AuthProvider } from '~/AuthContext'
// import { FavoriteProvider } from './FavoriteContext'
// import { queryClient } from '~/utils/queryClient'

// // Layouts
// import { MainLayout } from '~/MainLayout'
// import { VacationsSubLayout } from './VacationsSubLayout'

// // Pages
// import { BrowseVacationsPage, loader as BrowseVacationsLoader } from '~/BrowseVacationsPage'
// import { VacationDetailsPage, loader as VacationDetailsLoader } from './VacationDetailsPage'
// import { ErrorPage } from '~/ErrorPage'
// import { NotFoundPage } from '~/NotFoundPage'

// function App() {
//   const [favorites, setFavorites] = useState<number[]>([])

//   function updateFavorite(id: number) {
//     if (isFavorite(id)) {
//       setFavorites(favorites.filter((favId) => favId !== id))
//     } else {
//       setFavorites(favorites.concat(id))
//     }
//   }

//   function isFavorite(id: number) {
//     return favorites.includes(id)
//   }

//   return (
//     <RouterProvider
//       router={createBrowserRouter(
//         createRoutesFromElements(
//           <Route element={<MainLayout />}>
//             <Route
//               element={<VacationsSubLayout favorites={favorites} updateFavorite={updateFavorite} />}
//             >
//               <Route index element={<BrowseVacationsPage />} loader={BrowseVacationsLoader} />
//               <Route path="vacations">
//                 <Route
//                   path=":vacationId"
//                   element={
//                     <VacationDetailsPage
//                       favorites={favorites}
//                       updateFavorite={updateFavorite}
//                       isFavorite={isFavorite}
//                     />
//                   }
//                   loader={VacationDetailsLoader}
//                   errorElement={<ErrorPage />}
//                 />
//                 <Route path="deal-of-the-day" element={<Navigate to="../3" />} />
//                 <Route index element={<Navigate to="/" />} />
//               </Route>
//             </Route>
//             <Route path="*" element={<NotFoundPage />} />
//           </Route>
//         )
//       )}
//     />
//   )
// }

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <QueryClientProvider client={queryClient}>
//     <AuthProvider>
//       {/* <FavoriteProvider> */}
//       <App />
//       {/* </FavoriteProvider> */}
//     </AuthProvider>
//   </QueryClientProvider>
// )
