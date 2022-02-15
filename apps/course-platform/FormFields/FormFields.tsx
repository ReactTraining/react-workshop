import React, { useId } from 'react'
import classnames from 'classnames'
import { useField } from 'formik'
import styles from './FormFields.module.scss'

/****************************************
  FieldWrap
*****************************************/

type FieldWrapProps = {
  label: string
  name: string
  required?: boolean
  className?: string
  error?: string
  children(field: { id: string; name: string; [key: string]: any }): JSX.Element
}

export const FieldWrap: React.FC<FieldWrapProps> = ({
  label,
  name,
  required = false,
  error,
  children,
  className = '',
}) => {
  const [field, meta] = useField(name)
  const id = useId()

  return (
    <div className={classnames(styles.fieldWrap, className, { required })}>
      <label htmlFor={id}>{label}</label>
      <div>{children({ id, ...field })}</div>
      {typeof meta.error === 'string' && <div className={styles.fieldWrapError}>{meta.error}</div>}
    </div>
  )
}

/****************************************
  Custom Field Types
*****************************************/

type CustomFieldProps = {
  label: string
  name: string
  required?: boolean
}

type FieldInputProps = CustomFieldProps & React.InputHTMLAttributes<HTMLInputElement>

export const FieldInput = React.forwardRef<HTMLInputElement, FieldInputProps>(
  ({ label, name, className, required = false, type = 'text', ...props }, ref) => {
    return (
      <FieldWrap label={label} name={name} required={required}>
        {(field) => (
          <input
            ref={ref}
            {...props}
            {...field}
            onBlur={wrapEvent(props.onBlur, field.onBlur)}
            type={type}
            className={classnames('form-field', className)}
            required={required}
          />
        )}
      </FieldWrap>
    )
  }
)

/**
 * FieldSelect
 */

type FieldSelectProps = CustomFieldProps & React.HTMLAttributes<HTMLSelectElement>

export const FieldSelect = React.forwardRef<HTMLSelectElement, FieldSelectProps>(
  ({ label, name, className, required = false, ...props }, ref) => {
    return (
      <FieldWrap label={label} name={name} required={required}>
        {(field) => (
          <select
            {...props}
            {...field}
            onBlur={wrapEvent(props.onBlur, field.onBlur)}
            className={classnames('form-field', className)}
            required={required}
          />
        )}
      </FieldWrap>
    )
  }
)

/****************************************
  Utils
*****************************************/

function wrapEvent(theirHandler: any, ourHandler: any) {
  return (event: any) => {
    theirHandler && theirHandler(event)
    if (!event.defaultPrevented) {
      return ourHandler(event)
    }
  }
}
