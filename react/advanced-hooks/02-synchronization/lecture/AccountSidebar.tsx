import { useState, useEffect, useLayoutEffect, useSyncExternalStore, useCallback } from 'react'
import { AccountFavorites } from '~/AccountFavorites'
import { Heading } from '~/Heading'

// type Props = { width: number }

export function AccountSidebar({ width = 1200 }) {
  const query = `(min-width: ${width}px)`
  const [isWide, setIsWide] = useState(false)

  useLayoutEffect(() => {
    const media = window.matchMedia(query)
    setIsWide(media.matches)

    const listener = () => {
      setIsWide(media.matches)
    }
    media.addEventListener('change', listener)
    return () => {
      media.removeEventListener('change', listener)
    }
  }, [query])

  return isWide ? (
    <aside className="w-60 pr-6 border-r border-slate-300 space-y-6">
      <Heading size={3}>Favorites</Heading>
      <AccountFavorites />
    </aside>
  ) : null
}
