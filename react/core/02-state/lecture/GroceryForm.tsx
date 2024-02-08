import { useRef, useId } from 'react'

type Item = {
  name: string
  quantity: number
}

type Props = {
  onSubmit(values: Item): void
}

export function GroceryForm({ onSubmit }: Props) {
  const itemRef = useRef<HTMLInputElement>(null!)
  const quantityRef = useRef<HTMLInputElement>(null!)

  const itemNameId = useId() // :r0:
  const itemQuantityId = useId() // :r1:

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const name = formData.get('name') as string
    const quantity = parseInt(formData.get('quantity') as string)

    onSubmit({ name, quantity })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label htmlFor="item">Item</label>
        <input
          name="name"
          ref={itemRef}
          id="item"
          type="text"
          className="form-field"
          autoComplete="off"
        />
      </div>
      <div>
        <label htmlFor={itemQuantityId}>Quantity</label>
        <input
          name="quantity"
          ref={quantityRef}
          id={itemQuantityId}
          type="text"
          className="form-field"
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
