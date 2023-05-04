import { useId } from 'react'
import classnames from 'classnames'

type FieldWrapProps = {
  children: React.ReactNode
  label: string
  required?: boolean
}

export function FieldWrap({ children, label, required = false }: FieldWrapProps) {
  const id = useId()
  return (
    <div className={classnames('form-field-wrap space-y-3', { required })}>
      <label htmlFor={id}>{label}</label>
      <div>{children}</div>
    </div>
  )
}
