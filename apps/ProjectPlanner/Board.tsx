import React, { useState } from 'react'
import { CardList } from './CardList'
import { Heading } from './Heading'
import './Board.scss'

import { DragDropContext } from 'react-beautiful-dnd'

// type CardList = {
//   cardListId: number
//   name: string
//   itemIds: number[]
// }

type BoardData = {
  cardListId: number
  name: string
  cardIds: number[]
}

const data = [
  { cardListId: 1, name: 'One', cardIds: [1, 5] },
  { cardListId: 2, name: 'Two', cardIds: [9, 10] },
  { cardListId: 3, name: 'Three', cardIds: [] },
  { cardListId: 4, name: 'Four', cardIds: [] },
  { cardListId: 5, name: 'Five', cardIds: [] },
  { cardListId: 6, name: 'Six', cardIds: [] },
  { cardListId: 7, name: 'Seven', cardIds: [] },
]

// https://www.freecodecamp.org/news/how-to-add-drag-and-drop-in-react-with-react-beautiful-dnd/

export const Board: React.FC = () => {
  const [boardData, setBoardData] = useState<BoardData[]>(data)
  const [dragging, setDragging] = useState(false)

  function onDragEnd(result: any) {
    if (!result.destination) return
    const toIndex: number = result.destination.index
    const fromIndex: number = result.source.index
    const fromListId = parseInt(result.source.droppableId)
    const toListId = parseInt(result.destination.droppableId)
    setDragging(false)
    setBoardData(shuffleArray(boardData, fromListId, fromIndex, toListId, toIndex))
  }

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={() => setDragging(true)}>
      <div className="board spacing" data-board-dragging={dragging ? '' : undefined}>
        <Heading>Board Name</Heading>

        <div className="board-scroll-area">
          {boardData.map((boardList) => {
            return (
              <div className="card-list-wrap" key={boardList.cardListId}>
                <CardList
                  cardListId={boardList.cardListId}
                  name={boardList.name}
                  cardIds={boardList.cardIds}
                />
              </div>
            )
          })}
        </div>
      </div>
    </DragDropContext>
  )
}

/**
 * Utils
 */

function shuffleArray(
  data: BoardData[],
  fromListId: number,
  fromIndex: number,
  toListId: number,
  toIndex: number
) {
  return data.map((boardList) => {
    const isTo = boardList.cardListId === toListId
    const isFrom = boardList.cardListId === fromListId
    const cardIds = [...boardList.cardIds]

    // Moving to and from same array
    if (isTo && isFrom) {
      cardIds.splice(toIndex, 0, cardIds.splice(fromIndex, 1)[0])
      return { ...boardList, cardIds }

      // Move to different array
    } else {
      if (isTo) {
        const fromItemId = data.find((l) => l.cardListId === fromListId)?.cardIds[fromIndex]
        if (fromItemId) {
          return {
            ...boardList,
            cardIds: [
              ...cardIds.slice(0, toIndex),
              fromItemId,
              ...cardIds.slice(toIndex, cardIds.length),
            ],
          }
        }
      } else if (isFrom) {
        return {
          ...boardList,
          cardIds: cardIds.filter((id) => id !== cardIds[fromIndex]),
        }
      }
    }

    return boardList
  })
}
