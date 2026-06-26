import { useState, useLayoutEffect, Activity } from 'react'
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

  return (
    <Activity mode={isWide ? 'visible' : 'hidden'}>
      <aside className="w-60 pr-6 border-r border-slate-300 space-y-6">
        <Heading size={3}>Favorites</Heading>
        <Counter />
        <AccountFavorites />
      </aside>
    </Activity>
  )
}

function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div className="space-y-2">
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)} className="button">
        Increment
      </button>
    </div>
  )
}
