import React, { useState, useEffect } from 'react'
import { RecentBoards } from 'ProjectPlanner/RecentBoards'
import { ActiveUsers } from 'ProjectPlanner/ActiveUsers'
import 'ProjectPlanner/BrowseBoardsSidebar.scss'

export const BrowseBoardsSidebar: React.FC = () => {
  const [isWide, setIsWide] = useState(true)

  // What if we didn't want to show the sidebar if the screen was less than
  // 900px? We could use a CSS media query, but then we'd still get "side effects"
  // that are doing network requests in these children components even when the
  // user can't see the UI for them

  return isWide ? (
    <aside className="browse-boards-sidebar spacing">
      <RecentBoards />
      <ActiveUsers />
    </aside>
  ) : null
}
