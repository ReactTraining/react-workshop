import * as ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '~/AuthContext'
import { FavoriteProvider } from '~/FavoriteContext'
import { queryClient } from '~/utils/queryClient'
import { router } from '~/router'
import { create } from 'zustand'

const favStuff = {
  favorites: [],
  updateFavorite: (id: number) => {
    set((currentState) => {
      if (currentState.favorites.includes(id)) {
        // New State
        return {
          ...currentState,
          favorites: currentState.favorites.filter((favId) => favId !== id),
        }
      } else {
        // New State
        return {
          ...currentState,
          favorites: currentState.favorites.concat(id),
        }
      }
    })
  },
}

export const useGlobalState = create((set) => {
  return {
    ...favStuff,
  }
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  )
}

// export const useFavorites = create((set) => {
//   return {
//     favorites: [],
//     updateFavorite: (id: number) => {
//       set((currentState) => {
//         if (currentState.favorites.includes(id)) {
//           return {
//             ...currentState,
//             favorites: currentState.favorites.filter((favId) => favId !== id),
//           }
//         } else {
//           return { ...currentState, favorites: currentState.favorites.concat(id) }
//         }
//       })
//     },
//   }
// })

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
