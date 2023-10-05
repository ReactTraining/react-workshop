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

  // describing what you want
  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label htmlFor="item">Item</label>
        <input
          ref={itemRef}
          id="item"
          type="text"
          className="form-field"
          autoComplete="off"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
          }}
        />
      </div>
      <div>
        <label htmlFor="quantity">Quantity</label>
        <input
          value={quantity}
          onChange={(e) => {
            setQuantity(parseInt(e.target.value))
          }}
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
