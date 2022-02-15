import { useState, useEffect, useLayoutEffect } from 'react'
import { RecentLessons } from 'course-platform/RecentLessons'

export const AppSidebar: React.FC = () => {
  const isWide = true // if bigger than 1200px we want to show this sidebar

  return isWide ? (
    <aside className="card w-130">
      <RecentLessons />
    </aside>
  ) : null
}
