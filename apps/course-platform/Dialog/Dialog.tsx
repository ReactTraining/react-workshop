import React from 'react'
import { Dialog as ReachDialog } from '@reach/dialog'

type Props = {
  children: React.ReactNode
  onClose(): void
  'aria-label': string
  [key: string]: any
}

export function Dialog({ onClose, children, ...props }: Props) {
  return (
    <ReachDialog {...props} onDismiss={onClose}>
      <div className="p-5">{children}</div>
    </ReachDialog>
  )
}

/**
 * ConfirmDialog
 */

type DialogConfirmProps = {
  children: React.ReactNode
  onConfirm(): void
  onCancel(): void
  'aria-label': string
  [key: string]: any
}

export function DialogConfirm({ children, onConfirm, onCancel, ...props }: DialogConfirmProps) {
  return (
    <Dialog {...props} onClose={onCancel}>
      <div className="spacing">
        <div className="spacing">{children}</div>
        <footer className="horizontal-spacing">
          <button onClick={onConfirm} className="button">
            Yes
          </button>
          <button onClick={onCancel} className="button">
            No
          </button>
        </footer>
      </div>
    </Dialog>
  )
}
