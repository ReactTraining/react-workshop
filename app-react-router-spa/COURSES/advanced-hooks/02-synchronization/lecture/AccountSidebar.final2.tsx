import { useState, useEffect, useLayoutEffect, useSyncExternalStore, useCallback } from 'react'
import { AccountFavorites } from '~/AccountFavorites'
import { Heading } from '~/Heading'

function useQuery(query: string) {
  // Without Auto-Memoization, this function is unstable and a new function
  // passed to useSyncExternalStore will cause the cleanup to run. Therefore
  // each re-render will cause a unsubscribe then a re-subscribe. Solutions:
  // 1. Auto-Memoization
  // 2. useCallback

  const sub = useCallback(
    (cb: any) => {
      const media = window.matchMedia(query)
      media.addEventListener('change', cb)
      console.log('subscribe')
      return () => {
        console.log('unsubscribe')
        media.removeEventListener('change', cb)
      }
    },
    [query]
  )

  function getSnapshot() {
    return window.matchMedia(query).matches
  }

  return useSyncExternalStore(sub, getSnapshot)
}

type Props = { width: number }

export function AccountSidebar({ width }: Props) {
  const isWide = useQuery(`(min-width: ${width}px)`)

  return isWide ? (
    <aside className="w-60 pr-6 border-r border-slate-300 space-y-6">
      <Heading size={3}>Favorites</Heading>
      <AccountFavorites />
    </aside>
  ) : null
}
