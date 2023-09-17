import { useState } from 'react'
import { Icon } from '~/Icon'

export function CartReview() {
  const [items, setItems] = useState([
    { id: 1, name: 'Eggs', quantity: 12 },
    { id: 2, name: 'Bread', quantity: 1 },
    { id: 3, name: 'Tomatoes', quantity: 3 },
  ])

  const total = items.reduce((total, item) => total + item.quantity, 0)

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
            <div key={item.id} className="flex gap-6  items-center bg-slate-100 p-4">
              <div className="flex-1">{item.name}</div>
              <div className="flex-1">
                Quantity: <b>{item.quantity}</b>
              </div>
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
