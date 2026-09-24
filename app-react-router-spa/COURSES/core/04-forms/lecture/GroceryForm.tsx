import React, { useState, useRef } from 'react'

type Item = {
  name: string
  quantity: number
}

type Props = {
  onSubmit(values: Item): void
}

export function GroceryForm({ onSubmit }: Props) {
  // Teach refs with typescript
  // Teach React 19 actions

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.target)
    const name = formData.get('name') as string
    const quantity = parseInt(formData.get('quantity') as string)

    onSubmit({ name, quantity })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="itemName">Item</label>
        <input id="itemName" type="text" className="form-field" autoComplete="off" name="name" />
      </div>
      <div>
        <label htmlFor="itemQuantity">Quantity</label>
        <input id="itemQuantity" type="text" className="form-field" name="quantity" />
      </div>
      <footer></footer>
      <button type="submit" className="button">
        Add Item
      </button>
    </form>
  )
}
