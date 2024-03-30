import { useState, useRef, useId } from 'react'

type Item = {
  name: string
  quantity: number
}

type Props = {
  onSubmit(values: Item): void
}

export function GroceryForm({ onSubmit }: Props) {
  const quantityId = useId()
  const itemId = useId()

  const nameRef = useRef<HTMLInputElement>(null!)

  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState(0)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    onSubmit({ name, quantity })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label htmlFor={itemId}>Item</label>
        <input
          ref={nameRef}
          id={itemId}
          value={name}
          onChange={(e) => {
            setName(e.target.value)
          }}
          type="text"
          className="form-field"
          autoComplete="off"
          name="name"
        />
      </div>
      <div>
        <label htmlFor={quantityId}>Quantity</label>
        <input
          value={quantity}
          onChange={(e) => {
            setQuantity(parseInt(e.target.value))
          }}
          id={quantityId}
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
