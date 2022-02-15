import React from 'react'
import { Dialog as ReachDialog } from '@reach/dialog'

type Props = {
  onClose(): void
  'aria-label': string
  [key: string]: any
}

export const Dialog: React.FC<Props> = ({ onClose, children, ...props }) => {
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
  onConfirm(): void
  onCancel(): void
  'aria-label': string
  [key: string]: any
}

export const DialogConfirm: React.FC<DialogConfirmProps> = ({
  children,
  onConfirm,
  onCancel,
  ...props
}) => {
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
