import { useState, useRef } from 'react'

type Props = {
  onSubmit(values: any): void
}

export function GroceryForm({ onSubmit }: Props) {
  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()

    onSubmit({})
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label htmlFor="item">Item</label>
        <input id="item" type="text" className="form-field" />
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
