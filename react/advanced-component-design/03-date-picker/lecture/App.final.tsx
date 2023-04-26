import {
  DatePicker,
  DatePickerCalendar,
  DatePickerChangeMonth,
  DatePickerLabel,
} from './DatePicker.final'
import './styles.scss'

export function App() {
  return (
    <div className="spacing">
      <DatePicker selectRange>
        <div className="flex flex-gap-large">
          <div className="flex-1">
            <DatePickerLabel />
            <DatePickerCalendar />
          </div>
          <div className="flex-1">
            <DatePickerLabel offset={1} />
            <DatePickerCalendar offset={1} />
          </div>
        </div>
        <hr />
        <div className="horizontal-spacing">
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
