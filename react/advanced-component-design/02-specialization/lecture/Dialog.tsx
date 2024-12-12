import { Dialog as HeadlessDialog, DialogPanel, DialogTitle } from '@headlessui/react'

type DialogProps = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export function Dialog({ children, isOpen, onClose }: DialogProps) {
  return (
    <HeadlessDialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/20">
        <DialogPanel className="max-w-lg space-y-4 bg-white p-12 rounded">{children}</DialogPanel>
      </div>
    </HeadlessDialog>
  )
}

type DialogConfirmProps = {
  title: string
  onConfirm(): void
  onCancel(): void
  isOpen: boolean
  children: React.ReactNode
}

export function DialogConfirm({
  title,
  children,
  onConfirm,
  onCancel,
  isOpen,
}: DialogConfirmProps) {
  return (
    <Dialog isOpen={isOpen} onClose={onCancel}>
      <DialogTitle className="font-bold">{title}</DialogTitle>
      {children}
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
