import {
  DatePicker,
  DatePickerCalendar,
  DatePickerChangeMonth,
  DatePickerLabel,
} from '~/DatePicker'

type Props = {
  onSelect(s: string, e: string): void
}

// THIS FILE IS HERE SO YOU CAN SEE IT, NO CHANGES WILL BE NEEDED

export function SelectDateRange({ onSelect }: Props) {
  return (
    <div className="space-y-3">
      <DatePicker
        selectRange
        onSelectDate={(selectedDates) => {
          // Only call onSelect if we have both new dates
          if (selectedDates.length === 2) {
            onSelect(selectedDates[0].format('YYYY-MM-DD'), selectedDates[1].format('YYYY-MM-DD'))
          }
        }}
      >
        <div className="flex gap-6">
          <div className="flex-1 space-y-3">
            <div>
              <DatePickerLabel />
            </div>
            <DatePickerCalendar />
          </div>
          <div className="flex-1 space-y-3">
            <div>
              <DatePickerLabel offset={1} />
            </div>
            <DatePickerCalendar offset={1} />
          </div>
        </div>
        <hr />
        <div className="space-x-3 flex justify-between items-center">
          <DatePickerChangeMonth to={-1} className="">
            Previous
          </DatePickerChangeMonth>
          <DatePickerChangeMonth to={1} className="">
            Next
          </DatePickerChangeMonth>
        </div>
      </DatePicker>
    </div>
  )
}
