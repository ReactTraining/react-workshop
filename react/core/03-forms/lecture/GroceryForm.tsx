import { useState, useRef, FormEvent, useId } from 'react'

type Item = {
  name: string
  quantity: number
}

type Props = {
  onSubmit(values: Item): void
}

export function GroceryForm({ onSubmit }: Props) {
  const itemNameId = useId() // :r0:
  const quantityId = useId() // :r1:

  async function formAction(formData: FormData) {
    const name = formData.get('name') as string
    const quantity = parseInt(formData.get('quantity') as string)

    onSubmit({ name, quantity })
  }

  return (
    <form action={formAction} className="space-y-3">
      <div>
        <label htmlFor={itemNameId}>Item</label>
        <input
          ref={inputRef}
          id={itemNameId}
          type="text"
          className="form-field"
          autoComplete="off"
          name="name"
        />
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
