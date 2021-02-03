import React from 'react'
import { useHistory } from 'react-router-dom'
import { Centered } from 'ProjectPlanner/Centered'
import { Heading } from 'ProjectPlanner/Heading'
import { useBoards } from 'ProjectPlanner/hooks/dataHooks'
import { BrowseBoardItem } from 'ProjectPlanner/BrowseBoardItem'
import { useAuth } from 'ProjectPlanner/AuthContext'
import { api } from 'ProjectPlanner/api'

export const BrowseBoards: React.FC = () => {
  const { user } = useAuth()
  const boards = useBoards(user?.id)
  const history = useHistory()

  function newBoard(): void {
    if (!user) return
    api.boards.createBoard(user.id).then((board) => {
      history.push(`/boards/${board.id}`)
    })
  }

  return (
    <Centered size={50}>
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
        {boards &&
          boards.map((board) => {
            return <BrowseBoardItem key={board.id} board={board} />
          })}
      </div>
    </Centered>
  )
}
