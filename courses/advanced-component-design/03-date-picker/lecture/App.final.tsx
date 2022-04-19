import { useState } from 'react'
import dayjs from 'dayjs'
import { DatePicker, DatePickerCalendar } from './DatePicker.final'
import './styles.scss'

export function App() {
  const [day, setDay] = useState(() => dayjs(new Date()))

  function previous() {
    setDay(day.add(-1, 'day'))
  }

  function forward() {
    setDay(day.add(1, 'day'))
  }

  return (
    <div className="spacing">
      <DatePicker selectRange>
        <div className="flex flex-gap-large">
          <div className="flex-1">
            <DatePickerCalendar />
          </div>
          <div className="flex-1">
            <DatePickerCalendar offset={1} />
          </div>
        </div>
      </DatePicker>
      <hr />
      <div>Date: {day.format('DD')}</div>
      <div className="horizontal-spacing">
        <button className="button" onClick={previous}>
          Previous
        </button>
        <button className="button" onClick={forward}>
          Forward
        </button>
      </div>
    </div>
  )
}
