import { useMatches } from 'react-router'

export function useRouteLoaderData<T>(routeId: string) {
  const matches = useMatches()
  const route = matches.find((m) => m.id === routeId)
  return route?.data as T
}
