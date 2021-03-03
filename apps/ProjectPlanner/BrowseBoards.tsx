import React from 'react'
import { useHistory } from 'react-router-dom'
import { Centered } from 'ProjectPlanner/Centered'
import { Heading } from 'ProjectPlanner/Heading'
import { useBoards } from 'ProjectPlanner/hooks/dataHooks'
import { BrowseBoardItem } from 'ProjectPlanner/BrowseBoardItem'
import { BrowseBoardsSidebar } from 'ProjectPlanner/BrowseBoardsSidebar'
import { useAuth } from 'ProjectPlanner/AuthContext'
import { api } from 'ProjectPlanner/api'

export const BrowseBoards: React.FC = () => {
  const { user } = useAuth()
  const boards = useBoards()
  const history = useHistory()

  function newBoard(): void {
    if (!user) return
    api.boards.createBoard().then((board) => {
      history.push(`/boards/${board.id}`)
    })
  }

  return (
    <Centered size={50}>
      <div className="flex">
        <div className="flex-1">
          <div className="flex-split">
            <div>
              <Heading>Boards</Heading>
            </div>
            <div>
              <button className="button" onClick={newBoard}>
                New Board
              </button>
            </div>
          </div>
          <div className="spacing">
            {Array.isArray(boards) &&
              boards.length > 0 &&
              boards.map((board) => {
                return <BrowseBoardItem key={board.id} board={board} />
              })}
            {Array.isArray(boards) && boards.length === 0 && (
              <div className="no-results">No Boards</div>
            )}
          </div>
        </div>
        <BrowseBoardsSidebar />
      </div>
    </Centered>
  )
}
