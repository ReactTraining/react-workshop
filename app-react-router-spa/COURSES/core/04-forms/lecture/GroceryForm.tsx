import { useState, useRef } from 'react'
import { z } from 'zod'

const formSchema = z.object({
  name: z.string(),
  quantity: z.string().transform((val) => parseInt(val)),
})

type Item = z.infer<typeof formSchema>

type Props = {
  onSubmit(values: Item): void
}

export function GroceryForm({ onSubmit }: Props) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const formData = Object.fromEntries(data)

    const results = formSchema.safeParse(formData)
    if (results.success) {
      onSubmit(results.data)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label htmlFor="itemName">Item</label>
        <input
          id="itemName"
          // ref={nameRef}
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
        <button className="button">Add Item</button>
      </footer>
    </form>
  )
}
