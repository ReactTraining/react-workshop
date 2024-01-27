import { useState, useEffect, useLayoutEffect } from 'react'
import { AccountFavorites } from '~/AccountFavorites'
import { Heading } from '~/Heading'

function useMedia(query: string) {
  const [results, setResults] = useState(false)

  useLayoutEffect(() => {
    const media = window.matchMedia(query)
    setResults(media.matches)
    const listener = () => {
      setResults(media.matches)
    }
    media.addEventListener('change', listener)
    return () => {
      media.removeEventListener('change', listener)
    }
  }, [query])

  return results
}

export function AccountSidebar({ width = 1200 }) {
  // const isWide = useMedia(`(min-width: ${width}px)`)
  // const darkMode = useMedia(`(prefers-color-scheme: dark)`)
  // return isWide ? (
  //   <aside className="w-60 pr-6 border-r border-slate-300 space-y-6">
  //     {darkMode ? 'dark' : 'light'}
  //     <Heading size={3}>Favorites</Heading>
  //     <AccountFavorites />
  //   </aside>
  // ) : null

  return (
    <MediaQuery
      query="(min-width: 1200px)"
      render={(isWide) => {
        return isWide ? (
          <aside className="w-60 pr-6 border-r border-slate-300 space-y-6">
            <Heading size={3}>Favorites</Heading>
            <AccountFavorites />
          </aside>
        ) : null
      }}
    />
  )
}
