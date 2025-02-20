import { useState, useLayoutEffect } from 'react'
import { AccountFavorites } from '~/AccountFavorites'
import { Heading } from '~/Heading'

function useQuery(query: string) {
  const [matches, setMatches] = useState(true) // true even though we don't know yet

  useLayoutEffect(() => {
    const listener = () => {
      setMatches(media.matches)
    }
    const media = window.matchMedia(query)
    media.addEventListener('change', listener)
    return () => {
      media.removeEventListener('change', listener)
    }
  }, [query])

  return matches
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
