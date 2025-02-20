import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'

export function App() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div>
      <button className="button" onClick={() => setIsOpen(true)}>
        Open dialog
      </button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/20">
          <DialogPanel className="max-w-lg space-y-4 bg-white p-12 rounded">
            <DialogTitle className="font-bold">Deactivate account</DialogTitle>
            <p>
              Are you sure you want to deactivate your account? All of your data will be permanently
              removed.
            </p>
            <div className="flex gap-4">
              <button className="button" onClick={() => setIsOpen(false)}>
                Yes
              </button>
              <button className="button" onClick={() => setIsOpen(false)}>
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  )
}
