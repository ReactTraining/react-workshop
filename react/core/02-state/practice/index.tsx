import * as ReactDOM from 'react-dom/client'
import { Heading } from '~/Heading'
import { LessonBody, LessonCard } from '~/Lesson'
// import { CartShippingBilling } from './CartShippingBilling.final'
import { CartShippingBilling } from './CartShippingBilling'

function App() {
  return (
    <LessonBody>
      <LessonCard>
        <Heading>🚚 Shipping and Billing</Heading>
        <CartShippingBilling />
      </LessonCard>
    </LessonBody>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
