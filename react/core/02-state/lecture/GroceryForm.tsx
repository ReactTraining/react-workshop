import { useState, useRef } from 'react'

type Item = {
  name: string
  quantity: number
}

type Props = {
  onSubmit(values: Item): void
}

export function GroceryForm({ onSubmit }: Props) {
  function handleSubmit(event) {
    // Typescript has no idea what "event" is
    //
    // Three basic ways to get our form's fields
    // 1. new FormData
    // 2. Scrape for it: ids (bad) refs (good)
    // 3. Controlled with state
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label htmlFor="item">Item</label>
        <input id="item" type="text" className="form-field" autoComplete="off" />
      </div>
      <div>
        <label htmlFor="quantity">Quantity</label>
        <input id="quantity" type="text" className="form-field" />
      </div>
      <footer>
        <button type="submit" className="button">
          Add Item
        </button>
      </footer>
    </form>
  )
}
