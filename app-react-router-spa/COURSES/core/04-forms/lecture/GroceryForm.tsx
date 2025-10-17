import { useState, useRef } from 'react'
import { z } from 'zod'

const schema = z.object({
  name: z.string(),
  quantity: z.string().transform((val) => parseInt(val)),
})

type Item = z.infer<typeof schema>

type Props = {
  onSubmit(values: Item): void
}

export function GroceryForm({ onSubmit }: Props) {
  // const nameRef = useRef<HTMLInputElement>(null!)
  // const quantityRef = useRef<HTMLInputElement>(null!)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const rawValues = Object.fromEntries(formData)

    // Validate the form using zod
    const result = schema.safeParse(rawValues)

    if (result.success) {
      const formValues = result.data
      onSubmit(formValues)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label htmlFor="itemName">Item</label>
        <input id="itemName" type="text" className="form-field" autoComplete="off" name="name" />
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
