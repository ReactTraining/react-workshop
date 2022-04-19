import * as ReactDOM from 'react-dom/client'
import {
  DatePicker,
  DatePickerCalendar,
  DatePickerChangeMonth,
  DatePickerLabel,
} from './DatePicker.final'
// import {
//   DatePicker,
//   DatePickerCalendar,
//   DatePickerChangeMonth,
//   DatePickerLabel,
// } from './DatePicker'
import './styles.scss'

function App() {
  return (
    <div>
      <DatePicker>
        <div className="spacing">
          <header className="flex-split">
            <DatePickerChangeMonth to={-1} className="button">
              Previous
            </DatePickerChangeMonth>
            <DatePickerChangeMonth to={1} className="button">
              Next
            </DatePickerChangeMonth>
          </header>

          <div>
            <DatePickerLabel />
          </div>
          <DatePickerCalendar />

          <hr />

          <div>
            <DatePickerLabel offset={1} />
          </div>
          <DatePickerCalendar offset={1} />
        </div>
      </DatePicker>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(<App />)
