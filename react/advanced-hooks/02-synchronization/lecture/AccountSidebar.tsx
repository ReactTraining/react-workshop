import { useState, useLayoutEffect, useSyncExternalStore, useCallback } from 'react'
import { AccountFavorites } from '~/AccountFavorites'
import { Heading } from '~/Heading'

export function AccountSidebar({ width = 1200 }) {
  const query = `(min-width: ${width}px)`

  const subscription = useCallback(
    (cb) => {
      const media = window.matchMedia(query)
      media.addEventListener('change', cb)
      return () => {
        media.removeEventListener('change', cb)
      }
    },
    [query]
  )

  function getInitial() {
    const media = window.matchMedia(query)
    return media.matches
  }

  const isWide = useSyncExternalStore(subscription, getInitial)

  return isWide ? (
    <aside className="w-60 pr-6 border-r border-slate-300 space-y-6">
      <Heading size={3}>Favorites</Heading>
      <AccountFavorites />
    </aside>
  ) : null
}
