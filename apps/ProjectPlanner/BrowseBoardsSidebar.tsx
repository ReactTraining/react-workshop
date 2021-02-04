import React, { useState, useEffect } from 'react'
import { BsKanban } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { Heading } from 'ProjectPlanner/Heading'
import { Avatar } from 'ProjectPlanner/Avatar'
import { useTheme } from 'ProjectPlanner/ThemeContext'
import { useAuth } from 'ProjectPlanner/AuthContext'
import { useAccountUsers } from 'ProjectPlanner/hooks/dataHooks'
import { shuffle } from 'ProjectPlanner/utils'
import { Board } from 'ProjectPlanner/types'
import { api } from 'ProjectPlanner/api'
import * as localStorage from 'ProjectPlanner/localStorage'
import 'ProjectPlanner/BrowseBoardsSidebar.scss'

export const BrowseBoardsSidebar: React.FC = () => {
  const { user } = useAuth()
  const users = useAccountUsers(user?.accountId)
  const [recent, setRecent] = useState<Board[]>([])

  // Then we were going to work on #5. I think the lecture can be using effects for the title of
  // a task card perhaps, and doing the useMedia custom hook for hiding the sidebar

  useEffect(() => {
    if (!user) return
    const ids = localStorage.getRecentBoards()
    api.boards.getBoards(user.accountId).then((boards) => {
      let recent = boards.filter((b) => ids.includes[b.id])
      setRecent(recent)
    })
  }, [user])

  return (
    <aside className="browse-boards-sidebar spacing">
      <div className="spacing">
        <Heading size={3} as="h2">
          Recent Boards
        </Heading>
        {recent.length > 0 ? (
          <ul className="spacing-small">
            {recent.map((boardId: number) => {
              return <RecentWorkshop key={boardId} id={boardId} name="React Workshop" />
            })}
          </ul>
        ) : (
          <em>None</em>
        )}
      </div>
      <div className="spacing">
        <Heading size={3} as="h2">
          Active Users
        </Heading>
        <ul className="spacing-small">
          {Array.isArray(users) &&
            shuffle(users)
              .slice(0, 4)
              .map((user) => {
                return <ActiveUser key={user.id} avatarUrl={user.avatarUrl} name={user.name} />
              })}
        </ul>
      </div>
    </aside>
  )
}

type RecentWorkshopProps = {
  name: string
  id: number
}

const RecentWorkshop: React.FC<RecentWorkshopProps> = ({ id, name }) => {
  const theme = useTheme()
  return (
    <li className="flex items-center">
      <BsKanban className="block" color={theme.colors.purple} />
      <div className="ml-2">
        <Link to={`/boards/${id}`}>{name}</Link>
      </div>
    </li>
  )
}

type ActiveUserProps = {
  avatarUrl?: string | null
  name: string
}

const ActiveUser: React.FC<ActiveUserProps> = ({ avatarUrl, name }) => {
  return (
    <li className="flex items-center">
      <Avatar src={avatarUrl} size={1.5} />
      <div className="ml-2">
        <a href="#">{name}</a>
      </div>
    </li>
  )
}
