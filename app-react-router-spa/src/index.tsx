import * as ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '~/AuthContext'
import { FavoriteProvider } from '~/FavoriteContext'
import { queryClient } from '~/utils/queryClient'
import { router } from '~/router'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <FavoriteProvider>
          <RouterProvider router={router} />
        </FavoriteProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
