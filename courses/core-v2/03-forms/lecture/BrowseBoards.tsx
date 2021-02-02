import React, { useState, useRef } from 'react'
import { BsKanban } from 'react-icons/bs'
import { FaPlus } from 'react-icons/fa'
import { Heading } from 'ProjectPlanner/Heading'

let incrementId = 3

export const BrowseBoards = () => {
  const [boards, setBoards] = useState([
    { id: 1, name: 'Board One' },
    { id: 2, name: 'Board Two' },
  ])

  function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    // https://stackoverflow.com/a/43823786
    const name = (document.getElementById('boardName') as HTMLInputElement).value
    setBoards(boards.concat({ id: ++incrementId, name }))
  }

  function onRemove(id: number): void {
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
        <div className="browse-board-item flex items-center">
          <div className=" mr-2" style={{ fontSize: '2rem' }}>
            <BsKanban className="block" color="var(--purple)" />
          </div>
          <div className="spacing-small flex-1">
            <Heading>Board Name</Heading>
          </div>
          <div>
            <button className="button button-outline">Remove</button>
          </div>
        </div>
      </div>
    </div>
  )
}
