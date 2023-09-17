import { useState, useEffect, useLayoutEffect } from 'react'
import { RecentLessons } from '~/RecentLessons'

export const AppSidebar = () => {
  const [isWide, setIsWide] = useState(true)

  // if bigger than 1200px we want to show this sidebar

  return isWide ? (
    <aside className="card w-130">
      <RecentLessons />
    </aside>
  ) : null
}
