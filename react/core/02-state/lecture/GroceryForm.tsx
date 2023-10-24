import { useState, useRef, useId } from 'react'

type Item = {
  name: string
  quantity: number
}

type Props = {
  onSubmit(values: Item): void
}

export function GroceryForm({ onSubmit }: Props) {
  const nameId = useId() // React
  const quantityId = useId()

  const nameRef = useRef<HTMLInputElement>(null!)

  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState(1)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit({ name, quantity })

    setName('')
    setQuantity(0)

    nameRef.current.focus()
  }

  // "uncontrolled" means it has state from within
  // "controlled" means state is provided from the outside

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label htmlFor={nameId}>Item</label>
        <input
          ref={nameRef}
          value={name}
          onChange={(event) => {
            setName(event.target.value)
          }}
          id={nameId}
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
          onChange={(event) => {
            setQuantity(parseInt(event.target.value))
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
