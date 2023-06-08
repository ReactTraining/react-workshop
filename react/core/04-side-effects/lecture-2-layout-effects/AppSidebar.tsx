import { useState, useEffect, useLayoutEffect } from 'react'
import { RecentLessons } from '~/RecentLessons'

export const AppSidebar = ({ width = 1200 }) => {
  const query = `(min-width: ${width}px)`
  const [isWide, setIsWide] = useState(false)

  useLayoutEffect(() => {
    const media = window.matchMedia(query)
    setIsWide(media.matches)
    const listener = () => {
      setIsWide(media.matches)
    }
    media.addEventListener('change', listener)
    return () => {
      media.removeEventListener('change', listener)
    }
  }, [query])

  return isWide ? (
    <aside className="card w-130">
      <RecentLessons />
    </aside>
  ) : null
}
