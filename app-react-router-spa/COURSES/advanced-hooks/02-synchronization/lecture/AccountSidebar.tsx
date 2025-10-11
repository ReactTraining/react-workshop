import { useState, useEffect, useLayoutEffect, useSyncExternalStore, useCallback } from 'react'
import { AccountFavorites } from '~/AccountFavorites'
import { Heading } from '~/Heading'

// type Props = { width: number }

function useMedia(query: string) {
  const [matches, setMatches] = useState(false)

  useLayoutEffect(() => {
    const media = window.matchMedia(query)
    setMatches(media.matches)
    const listener = () => {
      setMatches(media.matches)
    }
    media.addEventListener('change', listener)
    return () => {
      media.removeEventListener('change', listener)
    }
  }, [query])

  return matches
}

export function AccountSidebar({ width = 1200 }) {
  const isWide = useMedia(`(min-width: ${width}px)`)
  const dark = useMedia(`(prefers-color-scheme: dark)`)

  return isWide ? (
    <aside className="w-60 pr-6 border-r border-slate-300 space-y-6">
      <div>{dark ? 'dark' : 'light'}</div>
      <Heading size={3}>Favorites</Heading>
      <AccountFavorites />
    </aside>
  ) : null
}
