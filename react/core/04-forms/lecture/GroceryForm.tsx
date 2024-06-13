import { useState, useRef, useEffect } from 'react'

type Item = {
  name: string
  quantity: number
}

type Props = {
  onSubmit(values: Item): void
}

export function GroceryForm({ onSubmit }: Props) {
  // Teach React 19 actions
  const nameRef = useRef<HTMLInputElement>(null!)
  // const quantityRef = useRef<HTMLInputElement>(null!)

  useEffect(() => {
    nameRef.current.focus()
  }, [])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const name = formData.get('name') as string
    const quantity = parseInt(formData.get('quantity') as string)
    onSubmit({ name, quantity })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label htmlFor="itemName">Item</label>
        <input
          ref={nameRef}
          id="itemName"
          type="text"
          className="form-field"
          autoComplete="off"
          name="name"
        />
      </div>
      <div>
        <label htmlFor="itemQuantity">Quantity</label>
        <input
          // ref={quantityRef}
          id="itemQuantity"
          type="text"
          className="form-field"
          name="quantity"
        />
      </div>
      <footer>
        <button type="submit" className="button">
          Add Item
        </button>
      </footer>
    </form>
  )
}
