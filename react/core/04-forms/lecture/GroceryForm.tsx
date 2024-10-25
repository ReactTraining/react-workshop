import { useState, useRef, useId } from 'react'

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

  const itemNameId = useId()
  // const itemNameRef = useRef<HTMLInputElement>(null!)

  function formAction(formData: FormData) {
    const name = formData.get('name') as string
    const quantity = parseInt(formData.get('quantity') as string)

    // const values = Object.fromEntries(formData)
    // console.log(values)

    onSubmit({ name, quantity })
  }

  return (
    <form action={formAction} className="space-y-3">
      <div>
        <label htmlFor={itemNameId}>Item</label>
        <input
          // ref={itemNameRef}
          id={itemNameId}
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
