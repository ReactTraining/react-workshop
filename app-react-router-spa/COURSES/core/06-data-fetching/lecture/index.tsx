import * as ReactDOM from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '~/AuthContext'
import { FavoriteProvider } from '~/FavoriteContext'
import { queryClient } from '~/utils/queryClient'
import { App } from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <FavoriteProvider>
        <App />
      </FavoriteProvider>
    </AuthProvider>
  </QueryClientProvider>
)
