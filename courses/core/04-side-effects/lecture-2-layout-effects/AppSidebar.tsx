import { useState, useEffect, useLayoutEffect } from 'react'
import { RecentLessons } from 'course-platform/RecentLessons'

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)

  useLayoutEffect(() => {
    const media = window.matchMedia(query)
    setMatches(media.matches) // correction
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

export const AppSidebar = ({ width = 1200 }) => {
  const isWide = useMediaQuery(`(min-width: ${width}px)`)
  const isDarkMode = useMediaQuery(`(prefers-color-scheme: dark)`)

  return isWide ? (
    <aside className="card w-130">
      {isDarkMode ? 'dark mode' : 'light'}
      <RecentLessons />
    </aside>
  ) : null
}
