import { useState, useRef } from 'react'

// type Props = {
//   onSubmit(values: any): void
// }

export function GroceryList() {
  const [items, setItems] = useState([
    { id: 1, name: 'Eggs', quantity: 12 },
    { id: 1, name: 'Bread', quantity: 1 },
    { id: 1, name: 'Tomatoes', quantity: 3 },
  ])

  return (
    <div className="space-y-3">
      {items.map((item) => {
        return (
          <div key={item.id} className="flex gap-6 bg-slate-100 p-4">
            <div className="flex-1">{item.name}</div>
            <div className="flex-1">Quantity: {item.quantity}</div>
          </div>
        )
      })}
    </div>
  )
}
