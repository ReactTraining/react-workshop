import { useState, useEffect, useLayoutEffect, useSyncExternalStore, useCallback } from 'react'
import { AccountFavorites } from '~/AccountFavorites'
import { Heading } from '~/Heading'

type Props = { width: number }

export function AccountSidebar({ width = 1200 }: Props) {
  const query = `(min-width: ${width}px)`
  // const [isWide, setIsWide] = useState(false) // starts off with the correct value (comes from a SE)

  const sub = (cb: any) => {
    const media = window.matchMedia(query)
    media.addEventListener('change', cb)
    console.log('subscribe')
    return () => {
      console.log('unsubscribe')
      media.removeEventListener('change', cb)
    }
  }

  function getSnapshot() {
    const media = window.matchMedia(query)
    return media.matches
  }

  const isWide = useSyncExternalStore(sub, getSnapshot)

  // useLayoutEffect(() => {
  //   setIsWide(media.matches)
  //   const listener = () => {
  //     setIsWide(media.matches)
  //   }
  //   media.addEventListener('change', listener)
  //   return () => {
  //     media.removeEventListener('change', listener)
  //   }
  // }, [query])

  return isWide ? (
    <aside className="w-60 pr-6 border-r border-slate-300 space-y-6">
      <Heading size={3}>Favorites</Heading>
      <AccountFavorites />
    </aside>
  ) : null
}
