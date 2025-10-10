import { useState } from 'react'
import { Heading } from '~/Heading'
import { Icon } from '~/Icon'
import { LessonCard } from '~/Lesson'
import { GroceryForm } from './GroceryForm'
import { Counter } from './Counter'

type Item = {
  id: number
  name: string
  quantity: number
}

export function Groceries() {
  const [minQuantity, setMinQuantity] = useState(0)

  const [items, setItems] = useState([
    { id: 1, name: 'Eggs', quantity: 12 },
    { id: 2, name: 'Bread', quantity: 1 },
    { id: 3, name: 'Tomatoes', quantity: 3 },
  ])

  function addItem(item: Item) {
    // Immutability
    // Make a copy
    // change the copy, not the orig
    // replace the orig with the copy

    // setItems([...items, item])
    setItems(items.concat(item))
  }

  // Without Cloning (Faster, More Difficult)
  function subtractQuantity(id: number) {
    const index = items.findIndex((item) => item.id === id)
    const newItem = { ...items[index], quantity: items[index].quantity - 1 }
    setItems(items.with(index, newItem))
  }

  // With Cloning (Slower, Easier)
  function addQuantity(id: number) {
    const index = items.findIndex((item) => item.id === id)
    const newItems = structuredClone(items) // deep clone
    newItems[index].quantity++
    setItems(newItems)
  }

  return (
    <div className="flex gap-12">
      <LessonCard className="w-64">
        <Counter count={minQuantity} setCount={setMinQuantity} />
      </LessonCard>
      <LessonCard className="flex-1">
        <div className="flex gap-12">
          <div className="w-48 space-y-6">
            <Heading size={3}>Groceries</Heading>
            <GroceryForm onSubmit={addItem} />
          </div>
          <div className="flex-1 space-y-3">
            {items
              .filter((item) => item.quantity >= minQuantity)
              .map((item) => {
                return (
                  <div key={item.id} className="flex gap-6 items-center bg-slate-100 p-4">
                    <div className="flex-1">{item.name}</div>
                    <div className="flex-1">Quantity: {item.quantity}</div>
                    <div className="flex-1 flex gap-2">
                      <button
                        className="bg-white border-slate-300 border-solid aspect-square rounded-md px-3 py-1"
                        onClick={() => subtractQuantity(item.id)}
                      >
                        <Icon name="minus" size={0.6} />
                      </button>
                      <button
                        className="bg-white border-slate-300 border-solid aspect-square rounded-md px-3 py-1"
                        onClick={() => addQuantity(item.id)}
                      >
                        <Icon name="plus" size={0.6} />
                      </button>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </LessonCard>
    </div>
  )
}
