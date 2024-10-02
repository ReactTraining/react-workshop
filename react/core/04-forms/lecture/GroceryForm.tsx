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
  // Teach React 19 actions

  const itemNameRef = useRef<HTMLInputElement>(null!)

  useEffect(() => {
    itemNameRef.current.focus()
  }, [])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const name = formData.get('name') as string
    const quantity = parseInt(formData.get('quantity') as string)

    onSubmit({ name, quantity })
    itemNameRef.current.value = ''
    itemNameRef.current.focus()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label htmlFor="itemName">Item</label>
        <input
          ref={itemNameRef}
          id="itemName"
          type="text"
          className="form-field"
          autoComplete="off"
          name="name"
        />
      </div>
      <div>
        <label htmlFor="itemQuantity">Quantity</label>
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
