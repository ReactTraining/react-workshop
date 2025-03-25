import { useRef, useId } from 'react'
import * as z from 'zod'

const formSchema = z.object({
  name: z.string(),
  quantity: z.string().transform((raw) => parseInt(raw)),
})

type Item = {
  name: string
  quantity: number
}

type Props = {
  onSubmit(values: Item): void
}

// Declarative: What you want (less hands on, less work)
// Imperative: How to do it (more hands on, more work)

// SE: Event based
// SE: render phase based

export function GroceryForm({ onSubmit }: Props) {
  const nameId = useId()

  const nameRef = useRef<HTMLInputElement>(null!)

  useEffect(() => {
    // reach out to the dom (imperative) to reset the field, and focus
    nameRef.current.value = ''
    nameRef.current.focus()
  }, [])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const name = data.get('name') as string
    const quantity = parseInt(data.get('quantity') as string)

    onSubmit({ name, quantity })

    // reach out to the dom (imperative) to reset the field, and focus
    nameRef.current.value = ''
    nameRef.current.focus()

    // const formData = Object.fromEntries(data)
    // const results = formSchema.safeParse(formData)
    // if (!results.success) {
    //   // error
    // } else {
    //   const formData = results.data
    //   onSubmit(formData)
    // }
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
