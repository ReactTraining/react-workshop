import { useState, useRef } from 'react'

type Props = {
  id: number
  name: string
  quantity: number
  onUpdate: (id: number, quantity: number) => void
}

export function CartItem({ id, name, quantity, onUpdate }: Props) {
  const [editMode, setEditMode] = useState(false)

  function save() {
    onUpdate(id, 5)
    setEditMode(false)
  }

  return (
    <div className="flex gap-6 items-center bg-slate-100 p-4">
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
            <input type="number" className="form-field text-xs w-20" aria-label="Edit Quantity" />
            <button className="button" type="button" onClick={save}>
              Save
            </button>
            <button className="button" type="button" onClick={() => setEditMode(false)}>
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  )
}
