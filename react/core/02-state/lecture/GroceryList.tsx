import { useState } from 'react'
import { Icon } from '~/Icon'

type Item = {
  id: number
  name: string
  quantity: number
}

type Props = {
  items: Item[]
  subtractQuantity(id: number): void
  addQuantity(id: number): void
  filterQuantity: number
}

// A nice visual explanation of keys
// https://twitter.com/dan_abramov/status/1415279090446204929

export function GroceryList({ items, subtractQuantity, addQuantity, filterQuantity }: Props) {
  const total = 12

  return (
    <>
      <div className="space-y-3">
        {items
          .filter((item) => item.quantity >= filterQuantity)
          .map((item) => {
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
        Total: <b>{total}</b>
      </div>
    </>
  )
}
