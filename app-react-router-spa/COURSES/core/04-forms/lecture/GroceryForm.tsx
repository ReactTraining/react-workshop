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
  // const nameRef = useRef<HTMLInputElement>(null!)
  // const quantityRef = useRef<HTMLInputElement>(null!)

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.target)
    const values = Object.fromEntries(formData)
    const results = formSchema.safeParse(values)

    if (results.success) {
      onSubmit(results.data)
    } else {
      // results.error
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
