import * as ReactDOM from 'react-dom/client'
import { Heading } from '~/Heading'
import { LessonBody, LessonCard } from '~/Lesson'
// import { PurchaseTickets } from './PurchaseTickets.final'
import { PurchaseTickets } from './PurchaseTickets'
import { GoogleMaps } from './GoogleMaps'

function App() {
  return (
    <LessonBody>
      <div className="flex gap-12">
        <LessonCard className="flex-1">
          <Heading>🗺️ Maps</Heading>
          <GoogleMaps />
        </LessonCard>

        <LessonCard className="flex-1">
          <Heading>🎟️ Tickets</Heading>
          <PurchaseTickets />
        </LessonCard>
      </div>
    </LessonBody>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
