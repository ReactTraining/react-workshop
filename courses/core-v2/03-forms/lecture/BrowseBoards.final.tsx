import React, { useState, useRef } from 'react'
import { BsKanban } from 'react-icons/bs'
import { FaPlus } from 'react-icons/fa'
import { Heading } from 'ProjectPlanner/Heading'
import { createBoard } from './utils'

type BoardData = {
  id: number
  name: string
}

export const BrowseBoards = () => {
  const [boards, setBoards] = useState<BoardData[]>([
    { id: 1, name: 'Board One' },
    { id: 2, name: 'Board Two' },
  ])

  const [name, setName] = useState('')
  const nameInputRef = useRef<HTMLInputElement>(null!)

  function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    const newBoard = createBoard(name)
    setBoards(boards.concat(newBoard))
    setName('')
    nameInputRef.current.focus()
  }

  function onRemove(id: number) {
    setBoards(boards.filter((b) => b.id !== id))
  }

  return (
    <div className="spacing">
      <form className="flex" onSubmit={onSubmit}>
        <div className="spacing">
          <Heading size={2}>Add Board:</Heading>
        </div>
        <div className="flex-1 mr-3 ml-3">
          <input
            type="text"
            className="form-field"
            placeholder="Board Name"
            ref={nameInputRef}
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
            aria-label="Board Name"
          />
        </div>
        <button className="button" type="submit">
          <FaPlus />
        </button>
      </form>

      <div className="spacing">
        {boards.map((board) => {
          return <BrowseBoardItem key={board.id} board={board} onRemove={onRemove} />
        })}
      </div>
    </div>
  )
}

type Props = {
  board: BoardData
  onRemove(id: number): void
}

const BrowseBoardItem: React.FC<Props> = ({ board, onRemove }) => {
  return (
    <div className="browse-board-item flex items-center">
      <BsKanban className="board-icon" color="var(--purple)" />
      <div className="spacing-small flex-1">
        <Heading as="h2">{board.name || <em>Board Name</em>}</Heading>
      </div>
      <button className="button button-outline" onClick={() => onRemove(board.id)}>
        Remove
      </button>
    </div>
  )
}
