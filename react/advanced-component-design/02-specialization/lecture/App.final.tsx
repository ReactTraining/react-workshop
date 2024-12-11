import { useState } from 'react'
import { DialogConfirm } from './Dialog.final'

export function App() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div>
      <button className="button" onClick={() => setIsOpen(true)}>
        Open dialog
      </button>

      <DialogConfirm
        title="Remove User"
        isOpen={isOpen}
        onConfirm={() => {
          setIsOpen(false)
          // other stuff
        }}
        onCancel={() => setIsOpen(false)}
      >
        Are you sure you want to deactivate your account? All of your data will be permanently
        removed.
      </DialogConfirm>
    </div>
  )
}
