import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BsKanban } from 'react-icons/bs'
import { Heading } from 'ProjectPlanner/Heading'
import { DialogConfirm } from 'ProjectPlanner/Dialog'
import { Board as BoardType } from 'ProjectPlanner/types'
import { useTheme } from 'ProjectPlanner/ThemeContext'
import api from 'ProjectPlanner/api'
import 'ProjectPlanner/BrowseBoardItem.scss'

type BrowseBoardItemProps = {
  board: BoardType
}

export const BrowseBoardItem: React.FC<BrowseBoardItemProps> = ({ board }) => {
  const [removed, setRemoved] = useState(false)
  const [confirmRemove, setConfirmRemove] = useState(false)
  const theme = useTheme()

  function remove(): void {
    api.boards.removeBoard(board.id).then(() => {
      setRemoved(true)
    })
  }

  if (removed) return null

  return (
    <>
      {confirmRemove && (
        <DialogConfirm
          onConfirm={remove}
          onCancel={() => setConfirmRemove(false)}
          aria-label="Remove Board?"
        >
          Are you sure you want to remove this Board?
        </DialogConfirm>
      )}
      <div className="browse-board-item flex items-center">
        <div className=" mr-4" style={{ fontSize: '4rem' }}>
          <BsKanban className="block" color={theme.colors.purple} />
        </div>
        <div className="spacing-small flex-1">
          <Heading>
            <Link to={`/boards/${board.id}`}>{board.name || <em>Board Name</em>}</Link>
          </Heading>
          <div className=" horizontal-spacing">
            <span>
              Tasks: <strong>12</strong>
            </span>
            <span>
              Total Time: <strong>4h</strong>
            </span>
            <span>
              Time Remaining: <strong>2h</strong>
            </span>
          </div>
        </div>
        <div>
          <button className="button button-outline" onClick={() => setConfirmRemove(true)}>
            Remove
          </button>
        </div>
      </div>
    </>
  )
}
