import { useState, useRef, useId } from 'react'
import * as z from 'zod'

const formSchema = z.object({
  name: z.string().min(5, 'Has to be 5 characters'),
  quantity: z
    .string()
    .min(5, 'Has to be 5 characters')
    .transform((value) => {
      return parseInt(value)
    }),
})

type Item = {
  name: string
  quantity: number
}

type Props = {
  onSubmit(values: Item): void
}

export function GroceryForm({ onSubmit }: Props) {
  const nameId = useId()
  const quantityId = useId()

  const nameRef = useRef<HTMLInputElement>(null!)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formValues = Object.fromEntries(new FormData(event.currentTarget))
    const results = formSchema.safeParse(formValues)

    if (results.success) {
      const data = results.data
      onSubmit(data)
      nameRef.current.value = ''
      nameRef.current.focus()
    }

    // const name = (formData.get('name') || '') as string
    // const quantity = parseInt((formData.get('quantity') || '') as string)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label htmlFor={nameId}>Item</label>
        <input
          ref={nameRef}
          id={nameId}
          type="text"
          className="form-field"
          autoComplete="off"
          name="name"
        />
      </div>
      <div>
        <label htmlFor={quantityId}>Quantity</label>
        <input id={quantityId} type="text" className="form-field" name="quantity" />
      </div>
      <footer>
        <button type="submit" className="button">
          Add Item
        </button>
      </footer>
    </form>
  )
}
