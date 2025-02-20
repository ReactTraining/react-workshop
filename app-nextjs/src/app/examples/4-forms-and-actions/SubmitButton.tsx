'use client'

import { useFormStatus } from 'react-dom'

export function SubmitButton({ children = 'Submit' }) {
  const { pending } = useFormStatus()

  return (
    <button type="submit" className="button" disabled={pending}>
      {pending ? '...' : children}
    </button>
  )
}
