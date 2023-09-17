import { useState, useRef } from 'react'
// import { CartItem } from './CartItem.final'
import { CartItem } from './CartItem'

export function CartReview() {
  const [items, setItems] = useState([
    { id: 1, name: 'Eggs', quantity: 12 },
    { id: 2, name: 'Bread', quantity: 1 },
    { id: 3, name: 'Tomatoes', quantity: 3 },
  ])

  const total = items.reduce((total, item) => total + item.quantity, 0)

  function updateQuantity(id: number, quantity: number) {
    const index = items.findIndex((item) => item.id === id)
    const newItems = structuredClone(items)
    if (quantity <= 0) {
      newItems.splice(index, 1)
    } else {
      newItems[index].quantity = quantity
    }
    setItems(newItems)
  }

  return (
    <>
      <div className="space-y-3 max-w-lg">
        {items.map((item) => {
          return (
            <div key={item.id} className="flex gap-6 items-center bg-slate-100 p-4">
              <div className="flex-1">{item.name}</div>
              <div className="flex-1 flex items-center gap-4">
                <input
                  type="number"
                  className="form-field text-xs w-20"
                  aria-label="Edit Quantity"
                  value={item.quantity}
                  onChange={() => {}}
                />
                <button className="button" type="button">
                  Save
                </button>
                <button className="button" type="button">
                  Cancel
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

{
  /* <CartItem
  key={item.id}
  id={item.id}
  name={item.name}
  quantity={item.quantity}
  onUpdate={updateQuantity}
/> */
}
