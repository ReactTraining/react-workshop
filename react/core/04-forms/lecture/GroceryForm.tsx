import { useState, useRef } from 'react'
import * as z from 'zod'

const formSchema = z.object({
  name: z.string().min(3, 'Bad input'),
  quantity: z.string().transform((value) => parseInt(value)),
})

type Item = z.infer<typeof formSchema>

type Props = {
  onSubmit(values: Item): void
}

export function GroceryForm({ onSubmit }: Props) {
  const nameRef = useRef<HTMLInputElement>(null!)
  // const quantityRef = useRef<HTMLInputElement>(null!)

  useEffect(() => {
    nameRef.current.focus()
  }, [])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const results = formSchema.safeParse(Object.fromEntries(formData))
    if (!results.error) {
      onSubmit(results.data)
    } else {
      console.log(results.error)
    }

    nameRef.current.focus()

    // const name = (formData.get('quantity') as string | null) || ''
    // const quantity = parseInt((formData.get('quantity') as string | null) || '')
    // onSubmit({ name, quantity })
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
        <input
          ref={quantityRef}
          id="itemQuantity"
          type="text"
          className="form-field"
          name="quantity"
        />
      </div>
      <footer>
        <button type="submit" className="button">
          Add Item
        </button>
      </footer>
    </form>
  )
}
