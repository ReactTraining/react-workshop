import { useId } from 'react'
import classnames from 'classnames'

type FieldWrapProps = {
  children: React.ReactNode
  label: string
  required?: boolean
  errors?: string[] | undefined
}

export function FieldWrap({ children, label, required = false, errors }: FieldWrapProps) {
  const id = useId()
  return (
    <div className={classnames('form-field-wrap space-y-1', { required })}>
      <label htmlFor={id} className="text-lg text-headingColor">
        {label}
      </label>
      <div>{children}</div>
      {errors && <div className="text-red-500">{errors.join(', ')}</div>}
    </div>
  )
}
