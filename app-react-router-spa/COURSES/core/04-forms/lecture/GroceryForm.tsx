import { useState, useRef } from 'react'
import z from 'zod'

const formSchema = z.object({
  name: z.string(),
  quantity: z
    .string()
    .min(1)
    .max(100)
    .transform((v) => parseInt(v)),
})

type Item = z.infer<typeof formSchema>

type Props = {
  onSubmit(values: Item): void
}

export function GroceryForm({ onSubmit }: Props) {
  const [nameInput, setNameInput] = useState()

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    // const name = formData.get('name') as string
    // const quantity = parseInt(formData.get('quantity') as string)

    const formValues = Object.fromEntries(formData)
    const results = formSchema.safeParse(formValues)
    if (results.success) {
      onSubmit(results.data)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3" noValidate>
      <div>
        <label htmlFor="itemName">Item</label>
        <input id="itemName" type="text" className="form-field" autoComplete="off" name="name" />
        <span></span>
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
