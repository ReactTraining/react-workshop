import React from 'react'
import { BsKanban } from 'react-icons/bs'

export const BrowseBoards = () => {
  const boards = [
    { id: 1, name: 'Board One' },
    { id: 2, name: 'Board Two' },
  ]

  function removeBoard(boardId) {
    console.log('Remove Board', boardId)
  }

  return (
    <div className="spacing">
      <Heading>Browse Boards</Heading>
      <div className="spacing">
        {boards.map((board) => {
          return (
            <div key={board.id} className="browse-board-item flex items-center">
              <BsKanban className="board-icon" color="var(--purple)" />
              <div className="spacing-small flex-1">
                <Heading as="h2" size={2}>
                  {board.name}
                </Heading>
              </div>
              <button className="button button-outline" onClick={() => removeBoard(board.id)}>
                Remove
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function Heading({ as: Comp = 'h1', size = 1, className, ...rest }) {
  return <Comp {...rest} className={`heading size-${size} ${className}`} />
}
