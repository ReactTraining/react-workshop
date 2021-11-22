import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import dayjs from 'dayjs'
import { DatePicker, DatePickerCalendar } from './DatePicker.final'
import 'ProjectPlanner/styles/global-styles.scss'
import './styles.scss'

function App() {
  const [day, setDay] = useState(() => dayjs(new Date()))

  function previous() {
    setDay(day.add(-1, 'day'))
  }

  function forward() {
    setDay(day.add(1, 'day'))
  }

  return (
    <div>
      <DatePicker selectRange>
        <div className="spacing">
          <DatePickerCalendar />
          <hr />
          <DatePickerCalendar offset={1} />
        </div>
      </DatePicker>
      {/* <div>Date: {day.format('DD')}</div>
      <div className="horizontal-spacing">
        <button className="button" onClick={previous}>
          Previous
        </button>
        <button className="button" onClick={forward}>
          Forward
        </button>
      </div> */}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
