import { useState, useRef, useId } from 'react'
import classnames from 'classnames'
import { useField } from 'formik'
import { BsCalendar3 } from 'react-icons/bs'
import { Popover } from './Popover'
import { SelectDateRange } from './SelectDateRangePopup'

/**
 * FieldWrap
 */

type FieldWrapProps = {
  children(f: any): React.ReactNode
  name: string
  label: string
  required?: boolean
}

export function FieldWrap({ name, label, required = false, children }: FieldWrapProps) {
  const [field, meta] = useField(name)
  const id = useId()
  return (
    <div className={classnames('field-wrap', { required })}>
      <label htmlFor={id}>{label}</label>
      <div>{children({ id, ...field })}</div>
      {meta.error && <div>{meta.error}</div>}
    </div>
  )
}

/**
 * FieldInput
 */

type FieldInputProps = {
  name: string
  label: string
  required?: boolean
  type?: 'text' | 'email' | 'password' | 'range'
  className: string
} & React.HTMLAttributes<HTMLInputElement>

export function FieldInput({
  name,
  label,
  required = false,
  type = 'text',
  className,
  ...props
}: FieldInputProps) {
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

/**
 * FieldDateRangePicker
 */

type FieldDateRangePickerProps = {
  startName: string
  endName: string
  label: string
} & React.HTMLAttributes<HTMLInputElement>

export function FieldDateRangePicker({
  startName,
  endName,
  label,
  ...props
}: FieldDateRangePickerProps) {
  const [openPopover, setOpenPopover] = useState(false)
  const targetRef = useRef<HTMLDivElement>(null!)

  // // Example: const [field, meta, helpers] = useField(name);
  // const { setValue: setStartValue } = useField(startName)[2]
  // const { setValue: setEndValue } = useField(endName)[2]

  const startData = useField(startName)
  const setStart = startData[2].setValue
  const startValue = startData[0].value

  const endData = useField(endName)
  const setEnd = endData[2].setValue
  const endValue = endData[0].value

  function onSelect(startDate: string, endDate: string) {
    setStart(startDate)
    setEnd(endDate)
  }

  return (
    <>
      {openPopover && (
        <Popover targetRef={targetRef}>
          <SelectDateRange onSelect={onSelect} />
        </Popover>
      )}

      <div className="form-field-icon" role="button" onClick={() => setOpenPopover(!openPopover)}>
        <div className="form-field-icon-input-wrap">
          <input
            type="text"
            readOnly
            value={startValue && `${startValue} - ${endValue}`}
            placeholder="Select a Date Range"
          />
        </div>
        <div ref={targetRef} className="form-field-icon-wrap">
          <BsCalendar3 />
        </div>
      </div>
    </>
  )
}
