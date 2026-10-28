import { queryOptions } from '@tanstack/react-query'
import { api } from '~/utils/api'
import { queryClient } from './queryClient'

// https://tanstack.com/query/latest/docs/framework/react/guides/query-options
// Defining queries once lets loaders and components share the same key + fetcher

export function vacationsQuery() {
  return queryOptions({
    queryKey: ['vacations'],
    queryFn: () => api.vacations.getAll(),
  })
}

export function vacationQuery(id) {
  return queryOptions({
    queryKey: ['vacations', id],
    queryFn: () => api.vacations.getVacation(id),
    // If the list was already loaded, use it so we don't need another request
    initialData: () => {
      return queryClient.getQueryData(vacationsQuery().queryKey)?.find((v) => v.id === id)
    },
    initialDataUpdatedAt: () => queryClient.getQueryState(vacationsQuery().queryKey)?.dataUpdatedAt,
  })
}
