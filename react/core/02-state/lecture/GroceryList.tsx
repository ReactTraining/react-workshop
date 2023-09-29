import { useState } from 'react'
import { Icon } from '~/Icon'

type Item = {
  id: number
  name: string
  quantity: number
}

type Props = {
  items: Item[]
  setItems(items: Item[]): void
}

// A nice visual explanation of keys
// https://twitter.com/dan_abramov/status/1415279090446204929

export function GroceryList({ items, setItems }: Props) {
  // Without Cloning (Faster, More Difficult)
  function subtractQuantity(id: number) {
    const index = items.findIndex((item) => item.id === id)
    const newItem = { ...items[index], quantity: items[index].quantity - 1 }
    if (newItem.quantity === 0) {
      setItems([...items.slice(0, index), ...items.slice(index + 1)])
    } else {
      setItems([...items.slice(0, index), newItem, ...items.slice(index + 1)])
    }
  }

  // With Cloning (Slower, Easier)
  function addQuantity(id: number) {
    const index = items.findIndex((item) => item.id === id)
    const newItems = structuredClone(items)
    newItems[index].quantity++
    setItems(newItems)
  }

  return (
    <>
      <div className="space-y-3">
        {items.map((item) => {
          return (
            <div key={item.id} className="flex gap-6 bg-slate-100 p-4">
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
      <div className="text-2xl">
        Total: <b>12</b>
      </div>
    </>
  )
}
