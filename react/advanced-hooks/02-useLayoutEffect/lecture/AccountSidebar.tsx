import { useState, useEffect, useLayoutEffect } from 'react'
import { AccountFavorites } from '~/AccountFavorites'
import { Heading } from '~/Heading'

function useQuery(query: string) {
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
  const isWide = useQuery(`(min-width: ${width}px)`)
  const darkMode = useQuery(`(prefers-color-scheme: dark)`)

  return isWide ? (
    <aside className="w-60 pr-6 border-r border-slate-300 space-y-6">
      {darkMode ? 'yes' : 'no'}
      <Heading size={3}>Favorites</Heading>
      <AccountFavorites />
    </aside>
  ) : null
}
