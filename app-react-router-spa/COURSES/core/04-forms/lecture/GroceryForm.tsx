import { useState, useRef } from 'react'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  quantity: z.string().transform((val) => parseInt(val)),
})

type Item = z.infer<typeof schema>

type Props = {
  onSubmit(values: Item): void
}

export function GroceryForm({ onSubmit }: Props) {
  const itemNameRef = useRef<HTMLInputElement>(null!)

  useEffect(() => {
    itemNameRef.current.focus()
  }, [])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const values = Object.fromEntries(formData)

    itemNameRef.current.value = ''
    itemNameRef.current.focus()

    const result = schema.safeParse(values)
    if (result.success) {
      onSubmit(result.data)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label htmlFor="itemName">Item</label>
        <input
          ref={itemNameRef}
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
