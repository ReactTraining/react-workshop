import { useState, useRef } from 'react'

type Props = {
  id: number
  name: string
  quantity: number
  onUpdate: (id: number, quantity: number) => void
}

export function CartItem({ id, name, quantity, onUpdate }: Props) {
  const [editMode, setEditMode] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null!)

  function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    onUpdate(id, parseInt(inputRef.current.value))
    setEditMode(false)
  }

  return (
    <form onSubmit={onSubmit} className="flex gap-6 items-center bg-slate-100 p-4">
      <div className="flex-1">{name}</div>
      <div className="flex-1 flex items-center gap-4">
        {!editMode ? (
          <>
            Quantity: <b>{quantity}</b>
            <button
              className="button whitespace-nowrap"
              type="button"
              onClick={() => setEditMode(true)}
            >
              Edit Quantity
            </button>
          </>
        ) : (
          <>
            <input
              ref={inputRef}
              defaultValue={quantity}
              type="number"
              className="form-field text-xs w-20"
            />
            <button className="button" type="submit">
              Save
            </button>
            <button className="button" type="button" onClick={() => setEditMode(false)}>
              Cancel
            </button>
          </>
        )}
      </div>
    </form>
  )
}
