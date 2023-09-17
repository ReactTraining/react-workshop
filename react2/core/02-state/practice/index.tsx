import * as ReactDOM from 'react-dom/client'
import { Heading } from '~/Heading'
import { LessonBody, LessonCard } from '~/Lesson'
import { CartReview } from './CartReview'
// import { CartShippingBilling } from './CartShippingBilling.final'
import { CartShippingBilling } from './CartShippingBilling'

function App() {
  return (
    <LessonBody>
      <div className="flex gap-12">
        <div className="flex-1">
          <LessonCard>
            <Heading>🛍️ Cart Review</Heading>
            <CartReview />
          </LessonCard>
        </div>
        <div className="flex-1">
          <LessonCard>
            <Heading>🚚 Shipping and Billing</Heading>
            <CartShippingBilling />
          </LessonCard>
        </div>
      </div>
    </LessonBody>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
