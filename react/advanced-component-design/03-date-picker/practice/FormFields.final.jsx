import { useState, useId } from 'react'
import { useField } from 'formik'
import classnames from 'classnames'
import { Popover } from '@headlessui/react'
import { usePopper } from 'react-popper'
import dayjs from 'dayjs'
import { SelectDateRange } from './SelectDateRange'
import { Icon } from '~/Icon'

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

export function FieldDatePicker({ startName, endName, label, required = false, ...props }) {
  let [referenceElement, setReferenceElement] = useState()
  let [popperElement, setPopperElement] = useState()
  let { styles, attributes } = usePopper(referenceElement, popperElement)

  const [startField, , startHelpers] = useField(startName)
  const [endField, , endHelpers] = useField(endName)

  function onSelectDates(start, end) {
    startHelpers.setValue(start)
    endHelpers.setValue(end)
  }

  const startValueFormatted = dayjs(startField.value).format('MMM D, YYYY')
  const endValueFormatted = dayjs(endField.value).format('MMM D, YYYY')

  const id = useId()

  return (
    <div className={classnames('space-y-1', { required })}>
      <label htmlFor={id}>{label}</label>
      <div>
        <div className="form-field inline-flex items-center">
          <input
            {...props}
            type="text"
            readOnly
            id={id}
            className="flex-1 border-none focus:outline-none"
            value={startField.value && `${startValueFormatted} to ${endValueFormatted}`}
            placeholder="Select a Date Range"
          />
          <Popover className="relative">
            <Popover.Button ref={setReferenceElement}>
              <Icon name="calendar" size={1} className="mb-1" />
            </Popover.Button>

            <Popover.Panel
              ref={setPopperElement}
              style={styles.popper}
              {...attributes.popper}
              className="absolute z-10 w-[600px] rounded-md shadow-lg p-3 bg-white border border-slate-200/60"
            >
              {({ close }) => {
                return (
                  <SelectDateRange
                    onSelect={(start, end) => {
                      onSelectDates(start, end)
                      setTimeout(close, 1000)
                    }}
                  />
                )
              }}
            </Popover.Panel>
          </Popover>
        </div>
      </div>
    </div>
  )
}
