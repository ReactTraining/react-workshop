import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainLayout } from './MainLayout'

/**
 * Version 5
 */

export function Appv5() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <MainLayout />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

/**
 * Version 4
 */

// export function Appv4() {
//   return (
//     <BrowserRouter>
//       <Switch>
//         <Route path="/" component={MainLayout} />
//       </Switch>
//     </BrowserRouter>
//   )
// }
