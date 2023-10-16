import { useId } from 'react'
import classnames from 'classnames'
import { Icon } from '~/Icon'
import { useField } from 'formik'

export function FieldWrap({ label, name, required = false, children }) {
  const [field, meta] = useField(name)
  const id = useId()
  return (
    <div className={classnames('space-y-1', { required })}>
      <label htmlFor={id}>{label}</label>
      <div>{children({ id, name, ...field })}</div>
      {meta.error && <p className="text-sm text-red-700">{meta.error}</p>}
    </div>
  )
}

export function FieldInput({ name, label, required = false, type = 'text', className, ...props }) {
  return (
    <FieldWrap name={name} label={label} required={required}>
      {(field) => {
        return (
          <input
            {...props}
            {...field}
            className={classnames('form-field', className)}
            type={type}
            required={required}
          />
        )
      }}
    </FieldWrap>
  )
}

export function FieldDatePicker({ name, label, ...props }) {
  return (
    <FieldWrap name={name} label={label}>
      {(field) => {
        return (
          <div className="form-field inline-flex items-center">
            <input
              {...field}
              {...props}
              type="text"
              className="flex-1 border-none focus:outline-none"
            />
            <Icon name="calendar" size={1} className="mb-1" />
          </div>
        )
      }}
    </FieldWrap>
  )
}
