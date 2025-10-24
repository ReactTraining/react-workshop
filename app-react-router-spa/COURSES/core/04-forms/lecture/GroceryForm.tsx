import { useState, useRef } from 'react'
import { z } from 'zod'

const itemSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  quantity: z.string().transform((val) => parseInt(val)),
})

type Item = z.infer<typeof itemSchema>

type Props = {
  onSubmit(values: Item): void
}

export function GroceryForm({ onSubmit }: Props) {
  // const nameRef = useRef<HTMLInputElement>(null!)

  // function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  //   event.preventDefault()

  //   const formData = new FormData(event.currentTarget)
  //   const formValues = Object.fromEntries(formData)

  //   const parseResult = itemSchema.safeParse(formValues)
  //   if (parseResult.success) {
  //     onSubmit(parseResult.data)
  //   }
  // }

  function handleSubmit(formData: FormData) {
    const formValues = Object.fromEntries(formData)

    const parseResult = itemSchema.safeParse(formValues)
    if (parseResult.success) {
      onSubmit(parseResult.data)
    }
  }

  return (
    <form action={handleSubmit} className="space-y-3">
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
