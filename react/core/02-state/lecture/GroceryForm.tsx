import { useState, useRef } from 'react'

type Item = {
  name: string
  quantity: number
}

type Props = {
  onSubmit(values: Item): void
}

export function GroceryForm({ onSubmit }: Props) {
  // const itemNameRef = useRef<HTMLInputElement>(null!)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const data = {
      name: formData.get('itemName') as string,
      quantity: parseInt(formData.get('quantity') as string),
    }

    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label htmlFor="item">Item</label>
        <input id="item" type="text" className="form-field" name="itemName" autoComplete="off" />
      </div>
      <div>
        <label htmlFor="quantity">Quantity</label>
        <input id="quantity" type="text" name="quantity" className="form-field" />
      </div>
      <footer>
        <button type="submit" className="button">
          Add Item
        </button>
      </footer>
    </form>
  )
}
