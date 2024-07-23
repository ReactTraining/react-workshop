import { useState, useRef, useId } from 'react'

type Item = {
  name: string
  quantity: number
}

type Props = {
  onSubmit(values: Item): void
}

export function GroceryForm({ onSubmit }: Props) {
  const itemNameRef = useRef<HTMLInputElement>(null!)

  const itemId = useId()
  const quantityId = useId()

  // useEffect(() => {
  //   itemNameRef.current.focus()
  // }, [])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const name = formData.get('name') as string
    const quantity = parseInt((formData.get('quantity') as string | null) || '')

    onSubmit({ name, quantity })
    itemNameRef.current.value = ''
    itemNameRef.current.focus()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label htmlFor={itemId}>Item</label>
        <input
          ref={itemNameRef}
          id={itemId}
          type="text"
          className="form-field"
          autoComplete="off"
          required
          name="name"
        />
      </div>
      <div>
        <label htmlFor={quantityId}>Quantity</label>
        <input id={quantityId} type="text" className="form-field" name="quantity" />
      </div>
      <footer>
        <button type="submit" className="button">
          Add Item
        </button>
      </footer>
    </form>
  )
}
