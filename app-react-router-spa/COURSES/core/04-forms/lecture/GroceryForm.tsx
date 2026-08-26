import { useState, useRef } from 'react'
import * as z from 'zod'

const formSchema = z.object({
  name: z.string(),
  quantity: z.string().transform((val) => parseInt(val)),
})

type Item = z.infer<typeof formSchema>

type Props = {
  onSubmit(values: Item): void
}

export function GroceryForm({ onSubmit }: Props) {
  // Teach refs with typescript
  // Teach React 19 actions

  // const nameRef = useRef<HTMLInputElement>(null!)

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.target)

    const rawFormValues = Object.fromEntries(formData)

    const results = formSchema.safeParse(rawFormValues)
    if (results.success) {
      const data = results.data
      onSubmit(data)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label htmlFor="itemName">Item</label>
        <input
          autoFocus
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
