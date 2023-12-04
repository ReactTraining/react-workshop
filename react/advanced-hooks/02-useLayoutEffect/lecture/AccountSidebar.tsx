import { useState, useEffect, useLayoutEffect } from 'react'
import { AccountFavorites } from '~/AccountFavorites'
import { Heading } from '~/Heading'

export function AccountSidebar() {
  const [isWide, setIsWide] = useState(true)

  // we want the first visible thing on the screen to be derived from state
  // BUT... our state needs to come from a side effect

  useLayoutEffect(() => {
    const media = window.matchMedia('(min-width: 1200px)')
    setIsWide(media.matches)
    const listener = () => {
      setIsWide(media.matches)
    }
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
