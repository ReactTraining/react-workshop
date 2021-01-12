import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { DragDropContext } from 'react-beautiful-dnd'
import { CardList } from 'ProjectPlanner/CardList'
import { Heading } from 'ProjectPlanner/Heading'
import api from 'ProjectPlanner/api'
import { CardList as CardListType, Board as BoardType } from './types'
import './Board.scss'

// https://www.freecodecamp.org/news/how-to-add-drag-and-drop-in-react-with-react-beautiful-dnd/

export const Board: React.FC = () => {
  const boardId = parseInt(useParams<{ boardId: string }>().boardId)
  const [dragging, setDragging] = useState(false)
  const [board, setBoard] = useState<BoardType>()
  const [dragSave, setDragSave] = useState(false)

  const cardLists = board?.cardLists

  useEffect(() => {
    let isCurrent = true
    api.boards.getBoard(boardId).then((board: BoardType) => {
      if (isCurrent) setBoard(board)
    })
    return () => {
      isCurrent = false
    }
  }, [boardId])

  useEffect(() => {
    if (board && dragSave) {
      api.boards.saveBoard(board.id, {
        cardLists,
      })
    }
  }, [board, cardLists, dragSave])

  function onDragEnd(result: any) {
    if (!result.destination || !board || !cardLists) return
    const toIndex: number = result.destination.index
    const fromIndex: number = result.source.index
    const fromListId = parseInt(result.source.droppableId)
    const toListId = parseInt(result.destination.droppableId)
    setDragging(false)
    setBoard({
      ...board,
      cardLists: shuffleArray(cardLists, fromListId, fromIndex, toListId, toIndex),
    })
    setDragSave(true)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={() => setDragging(true)}>
      <div className="board spacing" data-board-dragging={dragging ? '' : undefined}>
        <Heading>Board Name</Heading>

        <div className="board-scroll-area">
          {Array.isArray(cardLists) &&
            cardLists.map((cardList) => {
              return (
                <div className="card-list-wrap" key={cardList.cardListId}>
                  <CardList
                    cardListId={cardList.cardListId}
                    name={cardList.name}
                    cardIds={cardList.cardIds}
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
  cardLists: CardListType[],
  fromListId: number,
  fromIndex: number,
  toListId: number,
  toIndex: number
): CardListType[] {
  return cardLists.map((cardList) => {
    const isTo = cardList.cardListId === toListId
    const isFrom = cardList.cardListId === fromListId
    const cardIds = [...cardList.cardIds]

    // Moving to and from same array
    if (isTo && isFrom) {
      cardIds.splice(toIndex, 0, cardIds.splice(fromIndex, 1)[0])
      return { ...cardList, cardIds }

      // Move to different array
    } else {
      if (isTo) {
        const fromItemId = cardLists.find((l) => l.cardListId === fromListId)?.cardIds[fromIndex]
        if (fromItemId) {
          return {
            ...cardList,
            cardIds: [
              ...cardIds.slice(0, toIndex),
              fromItemId,
              ...cardIds.slice(toIndex, cardIds.length),
            ],
          }
        }
      } else if (isFrom) {
        return {
          ...cardList,
          cardIds: cardIds.filter((id) => id !== cardIds[fromIndex]),
        }
      }
    }

    return cardList
  })
}
