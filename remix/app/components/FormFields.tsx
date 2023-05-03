import { useId } from 'react'
import classnames from 'classnames'
import { Formik, Form, Field, useField } from 'formik'

type FieldWrapProps = {
  children(arg: { id: string }): React.ReactNode
  label: string
  name: string
  required?: boolean
}

export function FieldWrap({ children, label, name, required = false }: FieldWrapProps) {
  const [field, meta] = useField(name)
  const id = useId()
  return (
    <div className={classnames('form-field-wrap space-y-3', { required })}>
      <label htmlFor={id}>{label}</label>
      <div>{children({ id, ...field })}</div>
      {meta.error && <div>{meta.error}</div>}
    </div>
  )
}
