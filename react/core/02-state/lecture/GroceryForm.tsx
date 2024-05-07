import { useState, useRef } from 'react'

type Item = {
  name: string
  quantity: number
}

type Props = {
  onSubmit(values: Item): void
}

export function GroceryForm({ onSubmit }: Props) {
  // Teach refs with typescript

  function handleSubmit(event) {
    // Typescript has no idea what "event" is, so use "currentEvent"

    // Three basic ways to get our form's fields
    // 1. new FormData
    // 2. Scrape for it: ids (bad) refs (good)
    // 3. Controlled with state

    onSubmit({ name: 'test', quantity: 1 })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label htmlFor="item">Item</label>
        <input id="itemName" type="text" className="form-field" autoComplete="off" name="name" />
      </div>
      <div>
        <label htmlFor="quantity">Quantity</label>
        <input id="itemQuantity" type="text" className="form-field" name="quantity" />
      </div>
      <footer>
        <button type="submit" className="button">
          Add Item
        </button>
      </footer>
    </form>
  )
}
