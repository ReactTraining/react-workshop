import { useState, useEffect, useLayoutEffect, useSyncExternalStore, useCallback } from 'react'
import { AccountFavorites } from '~/AccountFavorites'
import { Heading } from '~/Heading'

const useIsomorphicEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)

  useIsomorphicEffect(() => {
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
  const isWide = useMediaQuery(`(min-width: ${width}px)`)
  const dark = useMediaQuery(`(prefers-color-scheme: dark)`)

  return isWide ? (
    <aside className="w-60 pr-6 border-r border-slate-300 space-y-6">
      {dark ? 'dark' : 'light'}
      <Heading size={3}>Favorites</Heading>
      <AccountFavorites />
    </aside>
  ) : null
}
