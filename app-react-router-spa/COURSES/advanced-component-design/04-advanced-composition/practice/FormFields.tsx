import { useState, useId } from 'react'
import { useFormContext } from 'react-hook-form'
import classnames from 'classnames'
import dayjs from 'dayjs'
import { Popover } from '@headlessui/react'
import { usePopper } from 'react-popper'
import { SelectDateRange } from './SelectDateRange'
import { Icon } from '~/Icon'

type FieldWrapProps = {
  children(obj: { id: string; 'aria-label'?: string }): React.ReactNode
  label: string
  hideLabel?: boolean
  name: string
}

export function FieldWrap({ children, name, label, hideLabel = false }: FieldWrapProps) {
  const id = useId()
  const { formState } = useFormContext()
  const error = formState.errors[name]?.message

  return (
    <div>
      {!hideLabel && <label htmlFor={id}>{label}</label>}
      {children({ id, 'aria-label': hideLabel ? label : undefined })}
      {typeof error === 'string' && <div className="text-sm text-red-800">{error}</div>}
    </div>
  )
}

type FieldInputProps = {
  label: string
  hideLabel?: boolean
  name: string
  type?: string
} & React.InputHTMLAttributes<HTMLInputElement>

export function FieldInput({
  label,
  hideLabel = false,
  name,
  type = 'text',
  ...props
}: FieldInputProps) {
  const { register } = useFormContext()

  return (
    <FieldWrap label={label} hideLabel={hideLabel} name={name}>
      {(field) => <input {...field} {...props} {...register(name)} type={type} />}
    </FieldWrap>
  )
}

type FieldDatePickerProps = {
  startName: string
  endName: string
  label: string
}

export function FieldDatePicker({ startName, endName, label, ...props }: FieldDatePickerProps) {
  const [referenceElement, setReferenceElement] = useState()
  const [popperElement, setPopperElement] = useState()
  const { styles, attributes } = usePopper(referenceElement, popperElement)

  // Integrating your custom input field (date picker) into the values of
  // React Hook Form will require these methods
  const { formState, setValue, getValues, trigger } = useFormContext()

  const startDateError = ''

  const startValueFormatted = getValues(startName)
    ? dayjs(getValues(startName)).format('MMM D, YYYY')
    : null
  const endValueFormatted = getValues(endName)
    ? dayjs(getValues(endName)).format('MMM D, YYYY')
    : null

  const id = useId()

  return (
    <div className="space-y-1">
      <label htmlFor={id}>{label}</label>
      <div>
        <div className="form-field ">
          <Popover className="relative">
            <Popover.Button ref={setReferenceElement} className="flex items-center w-full">
              <input
                {...props}
                type="text"
                readOnly
                id={id}
                className="flex-1 border-none focus:outline-none"
                value={endValueFormatted ? `${startValueFormatted} to ${endValueFormatted}` : ''}
                placeholder="Select a Date Range"
              />
              <Icon name="calendar" size={1} className="mb-1" />
            </Popover.Button>

            <Popover.Panel
              ref={setPopperElement}
              style={styles.popper}
              {...attributes.popper}
              className="absolute z-10 w-[600px] rounded-md shadow-lg p-3 bg-white border border-slate-200/60"
            >
              {({ close }) => {
                return <div>Remove this div and replace with SelectDateRange.</div>
              }}
            </Popover.Panel>
          </Popover>
        </div>
      </div>
      {typeof startDateError === 'string' && (
        <div className="text-sm text-red-800">{startDateError}</div>
      )}
    </div>
  )
}
