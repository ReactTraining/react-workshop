import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // mostly because it's curriculum
      staleTime: 1000 * 30,
    },
  },
})
