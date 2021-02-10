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
  const boards = [
    { id: 1, name: 'Board One' },
    { id: 2, name: 'Board Two' },
  ]

  function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    // https://stackoverflow.com/a/43823786
    const name = (document.getElementById('boardName') as HTMLInputElement).value
    const newBoard = createBoard(name)
  }

  function onRemove(id: number) {}

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
            id="boardName"
            required
            aria-label="Board Name"
          />
        </div>
        <button className="button" type="submit">
          <FaPlus />
        </button>
      </form>

      <div className="spacing">
        <BrowseBoardItem board={boards[0]} onRemove={() => {}} />
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
      <button className="button button-outline">Remove</button>
    </div>
  )
}
