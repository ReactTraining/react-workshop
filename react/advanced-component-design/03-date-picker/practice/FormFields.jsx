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

// This is just a reminder of where we left of with the FieldDatePicker
// export function FieldDatePicker({ name, label, ...props }) {
//   return (
//     <FieldWrap name={name} label={label}>
//       {(field) => {
//         return (
//           <div className="form-field inline-flex items-center">
//             <input
//               {...field}
//               {...props}
//               type="text"
//               className="flex-1 border-none focus:outline-none"
//             />
//             <Icon name="calendar" size={1} className="mb-1" />
//           </div>
//         )
//       }}
//     </FieldWrap>
//   )
// }

export function FieldDatePicker({ startName, endName, label, required = false, ...props }) {
  let [referenceElement, setReferenceElement] = useState()
  let [popperElement, setPopperElement] = useState()
  let { styles, attributes } = usePopper(referenceElement, popperElement)

  const [startField, , startHelpers] = useField(startName)
  const [endField, , endHelpers] = useField(endName)

  // useField() returns an array where the third part is an object of helpers.
  // Instead of a user typing into an input field and setting the Formik value,
  // you can programmatically call the helper.setValue('...') method.
  // Even though we have one real input field, we'll programmatically set
  // the Formik values of `startDate` and `endDate` when <SelectDateRange>
  // has values for us

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
              👋 Cool Popover from HeadlessUI
            </Popover.Panel>
          </Popover>
        </div>
      </div>
    </div>
  )
}

// <SelectDateRange
//   onSelect={(start, end) => {
//     onSelectDates(start, end)
//   }}
// />
