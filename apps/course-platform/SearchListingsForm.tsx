import { createContext, useContext, useRef, useState } from 'react'
import { Formik, Form, Field, useField } from 'formik'
import { FieldWrap } from 'course-platform/FormFields'
import { Popover } from 'course-platform/Popover'
import { Icon } from 'course-platform/Icon'
import locations from 'course-platform/utils/locations.json'
import type { Trip } from 'course-platform/utils/types'
import { useDelayedSetState } from 'course-platform/hooks/useDelayedCallback'
import {
  DatePicker,
  DatePickerChangeMonth,
  DatePickerMonth,
  DatePickerCalendar,
} from 'course-platform/DatePicker'
import dayjs from 'dayjs'
import styles from './SearchListingsForm.module.css'

type Context = {
  popoverIsOpen: boolean
  setPopoverIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

/****************************************
  SearchListingForm
*****************************************/

type SearchListingsFormProps = {
  handleSubmit(values: Trip): void
  trip?: Trip
} & React.HTMLAttributes<HTMLFormElement>

const defaultArrivalDate = dayjs(new Date()).add(1, 'day')

const Context = createContext<Context>(null!)

const defaultTrip: Trip = {
  travelers: 1,
  destination: 'hawaii',
  arrivalDate: defaultArrivalDate.toDate(),
  departureDate: defaultArrivalDate.add(7, 'day').toDate(),
}

export const SearchListingsForm: React.FC<SearchListingsFormProps> = ({
  children,
  handleSubmit,
  trip = defaultTrip,
  ...props
}) => {
  const [popoverIsOpen, setPopoverIsOpen] = useState(false)
  const divRef = useRef<HTMLDivElement>(null!)

  // function onSubmit2(values: Trip) {
  //   onSubmit(values)
  // }

  const context: Context = {
    popoverIsOpen,
    setPopoverIsOpen,
  }

  return (
    <Context.Provider value={context}>
      <Formik initialValues={trip} onSubmit={handleSubmit}>
        {popoverIsOpen && (
          <Popover targetRef={divRef} onClose={() => setPopoverIsOpen(false)}>
            <DatePickerPopover />
          </Popover>
        )}
        <div ref={divRef}></div>
        <Form {...props} onClick={(e) => e.stopPropagation()} noValidate>
          {children}
        </Form>
      </Formik>
    </Context.Provider>
  )
}

/****************************************
  FieldDatePicker
*****************************************/

type FieldDatePickerProps = {
  name: 'arrivalDate' | 'departureDate'
}

export function FieldDatePicker({ name }: FieldDatePickerProps) {
  const [field] = useField(name)
  const { setPopoverIsOpen } = useContext(Context)
  const label = name === 'departureDate' ? 'Departure Date' : 'Arrival Date'
  const displayValue = dayjs(field.value).format('MM/DD')

  return (
    <FieldWrap label={label} required>
      {({ id }) => (
        <div className="form-field-icon" onClick={() => setPopoverIsOpen(true)}>
          <div className="form-field-icon-input-wrap">
            <input id={id} value={displayValue} name={name} type="text" readOnly />
          </div>
          <div className="form-field-icon-wrap">
            <Icon name="calendar" />
          </div>
        </div>
      )}
    </FieldWrap>
  )
}

/****************************************
  DatePickerPopover
*****************************************/

function DatePickerPopover() {
  const { setPopoverIsOpen } = useContext(Context)
  const setPopoverIsOpenDelayed = useDelayedSetState<boolean>(setPopoverIsOpen, 1000)

  // Example: const [field, meta, helpers] = useField(name);
  const { setValue: setArrivalValue } = useField('arrivalDate')[2]
  const { setValue: setDepartureValue } = useField('departureDate')[2]

  return (
    <div className={styles.datePickerPopover}>
      <DatePicker
        selectRange
        disablePastDays
        onSelectDate={(selectedDates) => {
          if (selectedDates.length === 2) {
            setArrivalValue(selectedDates[0].toDate())
            setDepartureValue(selectedDates[1].toDate())
            setPopoverIsOpenDelayed(false)
          } else {
            setDepartureValue('')
            setArrivalValue('')
          }
        }}
      >
        <div className="flex flex-split flex-gap-large">
          <div className="flex flex-gap">
            <DatePickerChangeMonth to={-1}>
              <Icon name="circleArrowLeft" />
            </DatePickerChangeMonth>
            <DatePickerMonth format="MMMM YYYY" />
          </div>
          <div className="flex flex-gap">
            <DatePickerMonth format="MMMM YYYY" offset={1} />
            <DatePickerChangeMonth to={1}>
              <Icon name="circleArrowRight" />
            </DatePickerChangeMonth>
          </div>
        </div>
        <div className="flex flex-gap-large mt-4">
          <div className="flex-1">
            <DatePickerCalendar />
          </div>
          <div className="flex-1">
            <DatePickerCalendar offset={1} />
          </div>
        </div>
      </DatePicker>
    </div>
  )
}

/****************************************
  Misc Fields
*****************************************/

type FieldWrapProps = React.HTMLAttributes<HTMLDivElement>

export function FieldTravelers(props: FieldWrapProps) {
  return (
    <FieldWrap {...props} label="Travelers" required>
      {(props) => <Field {...props} type="text" name="travelers" className="form-field" />}
    </FieldWrap>
  )
}

export function FieldDestination(props: FieldWrapProps) {
  return (
    <FieldWrap {...props} label="Destination" required>
      {(props) => (
        <Field {...props} as="select" name="destination" className="form-field">
          {locations.map((l) => (
            <option key={l.slug} value={l.slug}>
              {l.name}
            </option>
          ))}
        </Field>
      )}
    </FieldWrap>
  )
}

// export function FieldRefundable(props: FieldWrapProps) {
//   return (
//     <div {...props}>
//       <label className="vertical-middle">
//         <Field type="checkbox" name="refundable" />
//         <span className="ml-1">Refundable?</span>
//       </label>
//     </div>
//   )
// }
