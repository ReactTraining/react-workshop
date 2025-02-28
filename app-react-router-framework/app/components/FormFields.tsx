import { useId } from 'react'
import classnames from 'classnames'

type FieldProps = {
  id: string
  required: boolean
}

type FieldWrapProps = {
  children: React.ReactNode | ((fieldProps: FieldProps) => React.ReactNode)
  label: string
  required?: boolean
  errors?: string[] | undefined
}

export function FieldWrap({ children, label, required = false, errors }: FieldWrapProps) {
  const id = useId()
  const fieldProps = { id, required }
  return (
    <div className={classnames('form-field-wrap space-y-1', { required })}>
      <label htmlFor={id} className="text-lg text-headingColor">
        {label}
      </label>
      <div>{typeof children === 'function' ? children(fieldProps) : children}</div>
      {errors && <div className="text-red-500">{errors.join(', ')}</div>}
    </div>
  )
}
