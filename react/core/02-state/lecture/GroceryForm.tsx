import { useState } from 'react'

type Item = {
  name: string
  quantity: number
}

type Props = {
  onSubmit(values: Item): void
}

export function GroceryForm({ onSubmit }: Props) {
  const [name, setName] = useState('')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const fields = Object.fromEntries(formData)

    console.log(fields)

    // onSubmit(fields)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label htmlFor="item">Item</label>
        <input id="item" type="text" className="form-field" autoComplete="off" name="item" />
      </div>
      <div>
        <label htmlFor="quantity">Quantity</label>
        <input id="quantity" type="text" className="form-field" name="quantity" />
      </div>
      <footer>
        <button type="submit" className="button">
          Add Item
        </button>
      </footer>
    </form>
  )
}
