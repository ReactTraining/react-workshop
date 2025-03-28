import { useState, useRef } from 'react'
import * as z from 'zod'

const formSchema = z.object({
  name: z.string(),
  quantity: z.string().transform((q) => parseInt(q)),
})

type FormDataType = z.infer<typeof formSchema>

type Props = {
  onSubmit(values: FormDataType): void
}

export function GroceryForm({ onSubmit }: Props) {
  // const nameRef = useRef<HTMLInputElement>(null!)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    // const name = formData.get('name') as string
    // const quantity = parseInt(formData.get('quantity') as string)

    const results = formSchema.safeParse(Object.fromEntries(formData))
    if (results.success) {
      const validFormData = results.data
      onSubmit(validFormData)
    } else {
      // results.error
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label htmlFor="itemName">Item</label>
        <input
          // ref={nameRef}
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
