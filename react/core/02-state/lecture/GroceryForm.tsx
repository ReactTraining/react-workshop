import { useState, useRef, useId } from 'react'

type Item = {
  name: string
  quantity: number
}

type Props = {
  onSubmit(values: Item): void
}

export function GroceryForm({ onSubmit }: Props) {
  // const itemNameRef = useRef<HTMLInputElement>(null!) // { current: null }

  const [itemName, setItemName] = useState('hello')
  const [quantity, setQuantity] = useState(0)

  const nameId = useId()
  const quantityId = useId()

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit({ name: itemName, quantity })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label htmlFor={nameId}>Name</label>
        <input
          // ref={itemNameRef}
          value={itemName}
          onChange={(event) => {
            setItemName(event.target.value)
          }}
          id={nameId}
          type="text"
          className="form-field"
          autoComplete="off"
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
          type="number"
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
