import { useState, useRef } from 'react'

type Item = {
  name: string
  quantity: number
}

type Props = {
  onSubmit(values: Item): void
}

export function GroceryForm({ onSubmit }: Props) {
  // function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  //   event.preventDefault()

  //   const formData = new FormData(event.currentTarget)

  //   // Option One
  //   const name = formData.get('name') as string
  //   const quantity = parseInt(formData.get('quantity') as string)

  //   // Option Two
  //   // const formValues = Object.fromEntries(formData) // zod

  //   onSubmit({ name, quantity })
  // }

  // While we can use these for SPAs (real benefit would just be that shortcut to formData)
  // The real benefit for actions is RSC (the way you use them with NextJS)
  function formAction(formData: FormData) {}

  return (
    <form action={formAction} className="space-y-3">
      <div>
        <label htmlFor="itemName">Item</label>
        <input id="itemName" type="text" className="form-field" autoComplete="off" name="name" />
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
