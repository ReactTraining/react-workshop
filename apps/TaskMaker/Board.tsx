import React, { useState } from 'react'
import { CardList } from './CardList'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'

import './Board.scss'

export const Board: React.FC<Props> = ({ boardId }) => {
  // const lists = [
  //   { cardListId: 1, name: 'One' },
  //   { cardListId: 2, name: 'Two' },
  //   { cardListId: 3, name: 'Three' },
  //   { cardListId: 4, name: 'Four' },
  //   { cardListId: 5, name: 'Five' },
  //   { cardListId: 6, name: 'Six' },
  // ]

  const [items, setItems] = useState(['1', '2', '3'])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  function handleDragEnd(event: any) {
    const { active, over } = event

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id)
        const newIndex = items.indexOf(over.id)

        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="board">
        <div className="board-scroll-area">
          {/* {lists.map((list: CardList) => {
            return <CardList key={list.cardListId} cardListId={list.cardListId} name={list.name} />
          })} */}

          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {items.map((id) => (
              <Item key={id} id={id}>
                Item: {id}
              </Item>
            ))}
          </SortableContext>
        </div>
      </div>
    </DndContext>
  )
}

type Props = {
  boardId: number
}

type CardList = {
  cardListId: number
  name: string
}

const Item: React.FC<{ id: string }> = ({ children, id }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  )
}
