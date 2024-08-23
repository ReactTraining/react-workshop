import { useState, useRef, useId } from 'react'

type Item = {
  name: string
  quantity: number
}

type Props = {
  onSubmit(values: Item): void
}

export function GroceryForm({ onSubmit }: Props) {
  const nameRef = useRef<HTMLInputElement>(null!)

  useEffect(() => {
    nameRef.current.focus()
  }, [])

  const nameId = useId() // :r0:
  const quantityId = useId() // :r1:

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const name = (formData.get('name') as string | null) || ''
    const quantity = parseInt((formData.get('quantity') as string | null) || '')

    onSubmit({ name, quantity })
    nameRef.current.value = ''
    nameRef.current.focus()
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
