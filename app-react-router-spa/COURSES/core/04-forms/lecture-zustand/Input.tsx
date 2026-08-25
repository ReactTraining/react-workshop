import { ComponentProps } from 'react'

type Props = ComponentProps<'input'>

export function Input({ className = 'form-field', ...props }: Props) {
  return <input className={className} {...props} />
}
