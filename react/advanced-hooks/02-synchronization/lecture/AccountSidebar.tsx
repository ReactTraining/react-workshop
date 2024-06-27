import { useState, useEffect, useLayoutEffect, useSyncExternalStore, useCallback } from 'react'
import { AccountFavorites } from '~/AccountFavorites'
import { Heading } from '~/Heading'

type Props = { width: number }

// synchronize: to make two things the same
// synchronous: immediate (not async)

export function AccountSidebar({ width }: Props) {
  const query = `(min-width: ${width}px)`

  const subscribe = (cb) => {
    const media = window.matchMedia(query)
    media.addEventListener('change', cb)

    return () => {
      console.log('cleanup')
      media.removeEventListener('change', cb)
    }
  }

  const getSnapshot = () => {
    const media = window.matchMedia(query)
    return media.matches
  }

  const isWide = useSyncExternalStore(subscribe, getSnapshot)

  return isWide ? (
    <aside className="w-60 pr-6 border-r border-slate-300 space-y-6">
      <Heading size={3}>Favorites</Heading>
      <AccountFavorites />
    </aside>
  ) : null
}
