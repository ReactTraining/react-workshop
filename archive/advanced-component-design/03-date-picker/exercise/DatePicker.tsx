import { createContext, useState, useContext } from 'react'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import isBetween from 'dayjs/plugin/isBetween'

dayjs.extend(duration)
dayjs.extend(isBetween)

type D = dayjs.Dayjs // smaller alias

// Depending on if `selectRange` is true, you can either
// select one date or two. But if one date is selected,
// we'll always store it as an array
type SelectedDates = [] | [D] | [D, D]

type ContextType = {
  selectedDates: SelectedDates
  selectDate(date: D): void
  baseMonthFirst: D
  setBaseMonth(to: number | D): void
}

/****************************************
  DatePicker
*****************************************/

type DatePickerProps = {
  children: React.ReactNode
  selectRange?: boolean
  // All the types DayJS can receive
  baseMonth?: string | number | D | Date | null | undefined
  onSelectDate?: (selectedDate: SelectedDates) => void
}

const Context = createContext<ContextType>(null!)

export function DatePicker({
  children,
  selectRange = false,
  baseMonth,
  onSelectDate,
}: DatePickerProps) {
  const [selectedDates, setSelectedDates] = useState<SelectedDates>([])

  // A DateJS (D) Object for the first day of the month
  const [baseMonthFirst, setBaseMonthFirst] = useState<D>(() => {
    return dayjs(baseMonth || new Date()).startOf('month')
  })

  function selectDate(date: D) {
    let newSelectedDates: SelectedDates = []
    if (selectRange && selectedDates.length === 1) {
      newSelectedDates = [selectedDates[0], date]
    } else {
      newSelectedDates = [date]
    }
    setSelectedDates(newSelectedDates)
    onSelectDate?.(newSelectedDates)
  }

  function setBaseMonth(to: number | D) {
    if (typeof to === 'number') {
      const newBaseMonth = baseMonthFirst.add(to, 'month')
      setBaseMonthFirst(newBaseMonth)
    } else {
      setBaseMonthFirst(to)
    }
  }

  const context: ContextType = {
    selectedDates,
    selectDate,
    baseMonthFirst,
    setBaseMonth,
  }

  return <Context.Provider value={context}>{children}</Context.Provider>
}

/****************************************
  DatePickerCalendar
*****************************************/

type Offset = -1 | 0 | 1
type DatePickerCalendarProps = {
  offset?: Offset
}

export function DatePickerCalendar({ offset = 0 }: DatePickerCalendarProps) {
  const { baseMonthFirst, selectDate, selectedDates } = useContext(Context)
  // The first day of the base month
  const theFirst = offset === 0 ? baseMonthFirst : baseMonthFirst.add(offset, 'month')

  // The day of the week of the first day of the month
  const dayOfWeek = theFirst.day()

  const today = dayjs(new Date())
  const daysInMonth = theFirst.daysInMonth()
  const year = theFirst.year()
  const monthNumber = theFirst.format('MM')

  const style = { '--datePickerCalendarBoxOffset': dayOfWeek + 1 } as React.CSSProperties

  return (
    <div data-datepicker-calendar="" style={style}>
      <div data-datepicker-calendar-dayofweek="">
        <div>S</div>
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div>S</div>
      </div>
      <div data-datepicker-calendar-boxes="">
        {[...Array(daysInMonth).keys()].map((n) => {
          const day = n + 1
          const dayPad = day.toString().padStart(2, '0')
          const timeStamp = `${year}-${monthNumber}-${dayPad}`
          const date = dayjs(timeStamp)

          const selectedFirst = selectedDates[0] && date.isSame(selectedDates[0], 'day')
          const selectedLast = selectedDates[1] && date.isSame(selectedDates[1], 'day')
          const selected = selectedFirst || selectedLast
          const isToday = today.isSame(date, 'day')
          const isPast = today.isAfter(date, 'day')

          const between =
            selectedDates.length === 2 && date.isBetween(selectedDates[0], selectedDates[1])

          return (
            <button
              key={day}
              type="button"
              data-selected={selected ? '' : undefined}
              data-selected-first={selectedFirst ? '' : undefined}
              data-selected-last={selectedLast ? '' : undefined}
              data-today={isToday ? '' : undefined}
              data-past={isPast ? '' : undefined}
              data-between={between ? '' : undefined}
              onClick={() => selectDate(date)}
            >
              <time dateTime={timeStamp}>{day}</time>
            </button>
          )
        })}
      </div>
    </div>
  )
}

/****************************************
  DatePicker Navigation
*****************************************/

type DatePickerChangeMonthProps = {
  children: React.ReactNode
  to: number | D
} & React.HTMLAttributes<HTMLButtonElement>

export function DatePickerChangeMonth({ children, to, ...props }: DatePickerChangeMonthProps) {
  const { setBaseMonth } = useContext(Context)
  return (
    <button
      type="button"
      {...props}
      data-datepicker-change-month=""
      onClick={() => setBaseMonth(to)}
    >
      {children}
    </button>
  )
}

/****************************************
  Labels
*****************************************/

type DatePickerLabelProps = {
  offset?: number
  format?: string
} & React.HTMLAttributes<HTMLDivElement>

export function DatePickerLabel({ format = 'MMMM', offset = 0, ...props }: DatePickerLabelProps) {
  const { baseMonthFirst } = useContext(Context)
  return <div {...props}>{baseMonthFirst.add(offset, 'month').format(format)}</div>
}
