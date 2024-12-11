import {
  DatePicker,
  DatePickerCalendar,
  DatePickerChangeMonth,
  DatePickerLabel,
} from './DatePicker.final'

export function App() {
  return (
    <div className="space-y-3">
      <DatePicker selectRange>
        <div className="flex gap-6">
          <div className="flex-1 space-y-3">
            <h1>
              <DatePickerLabel />
            </h1>
            <DatePickerCalendar />
          </div>
          <div className="flex-1 space-y-3">
            <h1>
              <DatePickerLabel offset={1} />
            </h1>
            <DatePickerCalendar offset={1} />
          </div>
        </div>
        <hr />
        <div className="space-x-3">
          <DatePickerChangeMonth to={-1} className="button">
            Previous
          </DatePickerChangeMonth>
          <DatePickerChangeMonth to={1} className="button">
            Next
          </DatePickerChangeMonth>
        </div>
      </DatePicker>
    </div>
  )
}
