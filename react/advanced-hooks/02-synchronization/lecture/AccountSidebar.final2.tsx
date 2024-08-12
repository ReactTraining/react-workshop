import { useState, useEffect, useLayoutEffect, useSyncExternalStore, useCallback } from 'react'
import { AccountFavorites } from '~/AccountFavorites'
import { Heading } from '~/Heading'

function useMedia(query: string) {
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
  const isWide = useMedia(`(min-width: ${width}px)`)

  return isWide ? (
    <aside className="w-60 pr-6 border-r border-slate-300 space-y-6">
      <Heading size={3}>Favorites</Heading>
      <AccountFavorites />
    </aside>
  ) : null
}
