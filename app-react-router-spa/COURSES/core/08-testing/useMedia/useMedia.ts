import { useCallback, useSyncExternalStore } from 'react'

function getServerSnapshot() {
  return false
}

// useSyncExternalStore is the current way to subscribe to a browser API.
// The snapshot is read during render, and React re-renders when matchMedia
// fires a change event.
export function useMedia(query: string) {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const media = window.matchMedia(query)
      media.addEventListener('change', onStoreChange)
      return () => media.removeEventListener('change', onStoreChange)
    },
    [query],
  )

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query])

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
