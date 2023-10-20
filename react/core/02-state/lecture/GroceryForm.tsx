import { useState, useRef } from 'react'

type Item = {
  name: string
  quantity: number
}

type Props = {
  onSubmit(values: Item): void
}

export function GroceryForm({ onSubmit }: Props) {
  const itemRef = useRef<HTMLInputElement>(null!) // { current: null }

  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState(0)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit({ name, quantity })

    setName('')
    setQuantity(0)

    itemRef.current.focus()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label htmlFor="item">Item</label>
        <input
          ref={itemRef}
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="item"
          type="text"
          className="form-field"
          autoComplete="off"
        />
      </div>
      <div>
        <label htmlFor="quantity">Quantity</label>
        <input
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          name="quantity"
          id="quantity"
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
