import React, { useState, useEffect } from 'react'
import { RecentBoards } from 'ProjectPlanner/RecentBoards'
import { ActiveUsers } from 'ProjectPlanner/ActiveUsers'
import 'ProjectPlanner/BrowseBoardsSidebar.scss'

export const BrowseBoardsSidebar: React.FC = () => {
  const [isWide, setIsWide] = useState(() => {
    return window && window.matchMedia('(min-width: 900px)').matches
  })

  useEffect(() => {
    const media = window.matchMedia('(min-width: 900px)')
    const change = () => setIsWide(media.matches)
    media.addEventListener('change', change)
    return () => {
      media.removeEventListener('change', change)
    }
  }, [])

  return isWide ? (
    <aside className="browse-boards-sidebar spacing">
      <RecentBoards />
      <ActiveUsers />
    </aside>
  ) : null
}

/**
 * Alternative Solution with different tradeoffs
 */

// export const BrowseBoardsSidebar: React.FC = () => {
//   const [isWide, setIsWide] = useState(false)

//   React.useLayoutEffect(() => {
//     const media = window.matchMedia('(min-width: 900px)')
//     const change = () => setIsWide(media.matches)
//     media.addEventListener('change', change)

//     // initial value
//     change()

//     return () => {
//       media.removeEventListener('change', change)
//     }
//   }, [])

//   return isWide ? (
//     <aside className="browse-boards-sidebar spacing">
//       <RecentBoards />
//       <ActiveUsers />
//     </aside>
//   ) : null
// }
