import * as ReactDOM from 'react-dom/client'
import { Heading } from '~/Heading'
import { LessonBody, LessonCard } from '~/Lesson'
// import { CartShippingBilling } from './CartShippingBilling.final'
import { CartShippingBilling } from './CartShippingBilling'
// import { GroceryList } from './GroceryList.final'
import { GroceryList } from './GroceryList'

function App() {
  return (
    <LessonBody>
      <div className="flex gap-12 max-lg:flex-col">
        <div className="lg:flex-1">
          <LessonCard>
            <Heading>🛒 Grocery List</Heading>
            <GroceryList />
          </LessonCard>
        </div>
        <div className="lg:flex-1">
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
