import { useState } from 'react'
import { DialogConfirm } from './Dialog'

export function App() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div>
      <button className="button" onClick={() => setIsOpen(true)}>
        Open dialog
      </button>
      <DialogConfirm
        title="Confirm Action"
        onConfirm={() => setIsOpen(false)}
        onCancel={() => setIsOpen(false)}
        isOpen={isOpen}
      >
        Are you sure you want to proceed?
      </DialogConfirm>
    </div>
  )
}
