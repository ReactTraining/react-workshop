import { QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // mostly because it's curriculum
    },
  },
})

export { queryClient }
