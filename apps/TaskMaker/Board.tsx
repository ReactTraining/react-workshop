import React, { useState } from 'react'
import { CardList } from './CardList'
import { Heading } from './Heading'
import './Board.scss'

import { DragDropContext } from 'react-beautiful-dnd'

type CardList = {
  cardListId: number
  name: string
  itemIds: number[]
}

type BoardData = {
  cardListId: number
  name: string
  itemIds: number[]
}

const data = [
  { cardListId: 1, name: 'One', itemIds: [1, 5] },
  { cardListId: 2, name: 'Two', itemIds: [9, 10] },
  { cardListId: 3, name: 'Three', itemIds: [] },
  { cardListId: 4, name: 'Four', itemIds: [] },
  { cardListId: 5, name: 'Five', itemIds: [] },
  { cardListId: 6, name: 'Six', itemIds: [] },
  { cardListId: 7, name: 'Seven', itemIds: [] },
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
                  itemIds={boardList.itemIds}
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
    const itemIds = [...boardList.itemIds]

    // Moving to and from same array
    if (isTo && isFrom) {
      itemIds.splice(toIndex, 0, itemIds.splice(fromIndex, 1)[0])
      return { ...boardList, itemIds }

      // Move to different array
    } else {
      if (isTo) {
        const fromItemId = data.find((l) => l.cardListId === fromListId)?.itemIds[fromIndex]
        if (fromItemId) {
          return {
            ...boardList,
            itemIds: [
              ...itemIds.slice(0, toIndex),
              fromItemId,
              ...itemIds.slice(toIndex, itemIds.length),
            ],
          }
        }
      } else if (isFrom) {
        return {
          ...boardList,
          itemIds: itemIds.filter((id) => id !== itemIds[fromIndex]),
        }
      }
    }

    return boardList
  })
}
