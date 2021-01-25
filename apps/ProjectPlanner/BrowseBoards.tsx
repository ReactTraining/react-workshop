import React from 'react'
import { useHistory } from 'react-router-dom'
import { Centered } from './Centered'
import { Heading } from './Heading'
import { useBoards } from './hooks/dataHooks'
import { BrowseBoardItem } from './BrowseBoardItem'
import { useAuth } from './AuthContext'
import api from './api'

export const BrowseBoards: React.FC = () => {
  const { user } = useAuth()
  const [boards, setBoards] = useBoards(1) // needs to be user.id
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
