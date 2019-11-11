import React from 'react'
import './FormField.scss'

const FormField = React.forwardRef(
  ({ name, label, children, as: Input = 'input', ...rest }, ref) => {
    if (!children && Input === 'input' && !rest.type) rest.type = 'text'
    rest.ref = ref

    return (
      <div className="form-field">
        <label htmlFor={`form-field-${name}`}>{label}</label>
        {children ? children : <Input {...rest} />}
      </div>
    )
  }
)

export default FormField
