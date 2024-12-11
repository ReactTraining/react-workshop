import { Dialog as HeadlessDialog, DialogPanel, DialogTitle } from '@headlessui/react'

type DialogProps = {
  open: boolean
  onClose(): void
  children: React.ReactNode
}

export function Dialog({ children, open, onClose }: DialogProps) {
  return (
    <HeadlessDialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/20">
        <DialogPanel className="max-w-lg space-y-4 bg-white p-12 rounded">{children}</DialogPanel>
      </div>
    </HeadlessDialog>
  )
}

type DialogConfirmProps = {
  title: string
  children: string
  onConfirm: () => void
  onCancel: () => void
  isOpen: boolean
}

export function DialogConfirm({
  title,
  children,
  onConfirm,
  onCancel,
  isOpen,
}: DialogConfirmProps) {
  return (
    <Dialog open={isOpen} onClose={onCancel}>
      <DialogTitle className="font-bold">{title}</DialogTitle>
      <p>{children}</p>
      <div className="flex gap-4">
        <button className="button" onClick={onConfirm}>
          Yes
        </button>
        <button className="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </Dialog>
  )
}
