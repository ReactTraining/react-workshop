import {
  DatePicker,
  DatePickerCalendar,
  DatePickerChangeMonth,
  DatePickerLabel,
} from './DatePicker'

type Props = {
  onSelect(s: string, e: string): void
}

export function SelectDateRange({ onSelect }: Props) {
  return (
    <div className="select-date-range">
      <DatePicker
        selectRange
        onSelectDate={(selectedDates) => {
          // Only call onSelect if we have both new dates
          if (selectedDates.length === 2) {
            onSelect(selectedDates[0].format('YYYY-MM-DD'), selectedDates[1].format('YYYY-MM-DD'))
          }
        }}
      >
        <div className="spacing">
          <div className="flex flex-gap-large">
            <div className="flex-1 spacing">
              <DatePickerLabel />
              <DatePickerCalendar />
            </div>
            <div className="flex-1 spacing">
              <DatePickerLabel offset={1} />
              <DatePickerCalendar offset={1} />
            </div>
          </div>

          <div className="flex-split">
            <DatePickerChangeMonth to={-1}>Previous</DatePickerChangeMonth>
            <DatePickerChangeMonth to={1}>Next</DatePickerChangeMonth>
          </div>
        </div>
      </DatePicker>
    </div>
  )
}
