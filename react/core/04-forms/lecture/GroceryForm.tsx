import { useState, useRef } from 'react'

type Item = {
  name: string
  quantity: number
}

type Props = {
  onSubmit(values: Item): void
}

export function GroceryForm({ onSubmit }: Props) {
  // Teach refs with typescript
  // Teach React 19 actions

  const inputNameRef = useRef() // { current: undefined}

  useEffect(() => {
    inputNameRef.current.focus()
  }, [])

  function handleSubmit(event: any) {
    event.preventDefault()
    // Three basic ways to get our form's fields
    // 1. Scrape for it: ids (bad) refs (good)
    // 2. Controlled with state
    // 3. new FormData
    onSubmit({ name: 'test', quantity: 1 })
    inputNameRef.current.value = ''
    inputNameRef.current.focus()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label htmlFor="itemName">Item</label>
        <input
          ref={inputNameRef}
          id="itemName"
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
