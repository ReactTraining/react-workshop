import { useState } from 'react'

type Item = {
  name: string
  quantity: number
}

type Props = {
  onSubmit(values: Item): void
}

export function GroceryForm({ onSubmit }: Props) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const fields = {
      name: (formData.get('item') || '').toString(),
      quantity: parseInt((formData.get('quantity') as string) || ''),
    }

    onSubmit(fields)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label htmlFor="item">Item</label>
        <input
          id="item"
          type="text"
          className="form-field"
          autoComplete="off"
          name="item"
          required
        />
      </div>
      <div>
        <label htmlFor="quantity">Quantity</label>
        <input id="quantity" type="number" className="form-field" name="quantity" />
      </div>
      <footer>
        <button type="submit" className="button">
          Add Item
        </button>
      </footer>
    </form>
  )
}
