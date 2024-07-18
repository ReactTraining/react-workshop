import * as ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '~/AuthContext'
import { FavoriteProvider } from '~/FavoriteContext'
import { queryClient } from '~/utils/queryClient'
import { router } from '~/router'

function App() {
  return (
    <ReduxProvider>
      <QueryClientProvider client={queryClient}>
        <App1></App1>
        <App2></App2>
      </QueryClientProvider>
    </ReduxProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
