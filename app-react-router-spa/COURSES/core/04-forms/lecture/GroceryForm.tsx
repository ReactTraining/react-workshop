import { useState, useRef } from 'react'
import { z } from 'zod'

const formSchema = z.object({
  name: z.string().min(1),
  quantity: z
    .string()
    .min(1)
    .transform((num) => parseInt(num)),
})

type Item = z.infer<typeof formSchema>

type Props = {
  onSubmit(values: Item): void
}

export function GroceryForm({ onSubmit }: Props) {
  const nameRef = useRef<HTMLInputElement>(null!)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const formValues = Object.fromEntries(formData)
    const results = formSchema.safeParse(formValues)
    if (results.success) {
      onSubmit(results.data)
      nameRef.current.value = ''
      nameRef.current.focus()
    } else {
      // set state
    }

    // const name = formData.get('name') as string
    // const quantity = parseInt(formData.get('quantity') as string)
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
