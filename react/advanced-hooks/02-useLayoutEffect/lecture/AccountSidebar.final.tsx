import { useState, useEffect, useLayoutEffect } from 'react'
import { AccountFavorites } from '~/AccountFavorites'
import { Heading } from '~/Heading'

export function AccountSidebar() {
  const query = '(min-width: 1200px)'
  const [isWide, setIsWide] = useState(true)

  useLayoutEffect(() => {
    const listener = () => {
      setIsWide(media.matches)
    }
    const media = window.matchMedia(query)
    media.addEventListener('change', listener)
    return () => {
      media.removeEventListener('change', listener)
    }
  }, [])

  return isWide ? (
    <aside className="w-60 pr-6 border-r border-slate-300 space-y-6">
      <Heading size={3}>Favorites</Heading>
      <AccountFavorites />
    </aside>
  ) : null
}
