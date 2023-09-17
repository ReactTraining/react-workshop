import * as ReactDOM from 'react-dom/client'
import { Heading } from '~/Heading'
import { LessonBody, LessonCard } from '~/Lesson'
// import { CartReview } from './CartReview.final'
// import { GoogleMaps } from './GoogleMaps.final'
import { CartReview } from './CartReview'
import { GoogleMaps } from './GoogleMaps'

/**
 * 1. Refactor to const [formFields, setFormFields] = useState({ ... })
 * 2. Use useId() for ids
 * 3. Refactor to refs instead of controlled form fields
 * 4. If there's enough time and interest, refactor to uesReducer()
 */

function App() {
  return (
    <LessonBody>
      <div className="flex gap-12">
        <div className="flex-1">
          <LessonCard>
            <Heading>🗺️ Maps</Heading>
            <GoogleMaps />
          </LessonCard>
        </div>
        <div className="flex-1">
          <LessonCard>
            <Heading>🛍️ Cart Review</Heading>
            <CartReview />
          </LessonCard>
        </div>
      </div>
    </LessonBody>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
