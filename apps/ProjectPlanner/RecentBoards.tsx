import React, { useState, useEffect } from 'react'
import { BsKanban } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { Heading } from 'ProjectPlanner/Heading'
import { useTheme } from 'ProjectPlanner/ThemeContext'
import { useAuth } from 'ProjectPlanner/AuthContext'
import { Board } from 'ProjectPlanner/types'
import { api } from 'ProjectPlanner/api'
import * as localStorage from 'ProjectPlanner/localStorage'

export const RecentBoards: React.FC = () => {
  const { user } = useAuth()
  const [recent, setRecent] = useState<Board[]>([])

  useEffect(() => {
    const ids = localStorage.getRecentBoards()
    api.boards.getBoards().then((boards) => {
      const recent = ids
        .map((id) => {
          return boards.find((b) => b.id === id)
        })
        .filter((b) => b !== undefined) as Board[]
      setRecent(recent)
    })
  }, [])

  return (
    <div className="spacing">
      <Heading size={3} as="h2">
        Recent Boards
      </Heading>
      {recent.length > 0 ? (
        <ul className="spacing-small">
          {recent.map((board) => {
            return <RecentBoardItem key={board.id} id={board.id} name={board.name} />
          })}
        </ul>
      ) : (
        <em>None</em>
      )}
    </div>
  )
}

type RecentBoardItemProps = {
  name: string
  id: number
}

const RecentBoardItem: React.FC<RecentBoardItemProps> = ({ id, name }) => {
  const theme = useTheme()
  return (
    <li className="flex items-center">
      <BsKanban className="block" color={theme.colors.purple} />
      <div className="ml-2">
        <Link to={`/boards/${id}`}>{name || <em>Board Name</em>}</Link>
      </div>
    </li>
  )
}
