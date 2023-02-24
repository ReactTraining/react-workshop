import { useState, useRef, useId } from 'react'
import classnames from 'classnames'
import dayjs from 'dayjs'
import { useField } from 'formik'
import { BsCalendar3 } from 'react-icons/bs'
import { Popover } from 'course-platform/PopoverX'
import { SelectDateRange } from './SelectDateRange'
import { useDelayedCallback } from './useDelayedCallback'

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
      {meta.error && <div className="text-pink">{meta.error}</div>}
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
  label: string
} & React.HTMLAttributes<HTMLInputElement>

export function FieldDateRangePicker({ label, ...props }: FieldDateRangePickerProps) {
  const [openPopover, setOpenPopover] = useState(false)
  const setOpenPopoverDelayed = useDelayedCallback(setOpenPopover)
  const targetRef = useRef<HTMLDivElement>(null!)
  const id = useId()

  // const [field, meta, helpers] = useField(fieldName);

  return (
    <>
      {openPopover && (
        <Popover targetRef={targetRef} onClose={() => setOpenPopover(false)}>
          Put SelectDateRange Here
        </Popover>
      )}

      <div className="field-wrap">
        <label htmlFor={id}>{label}</label>
        <div>
          <div
            className="form-field-icon"
            role="button"
            onClick={(e) => {
              e.stopPropagation()
              setOpenPopover(!openPopover)
            }}
          >
            <div className="form-field-icon-input-wrap">
              <input
                {...props}
                type="text"
                readOnly
                id={id}
                value={``}
                placeholder="Select a Date Range"
              />
            </div>
            <div ref={targetRef} className="form-field-icon-wrap">
              <BsCalendar3 />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
