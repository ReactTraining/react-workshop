import * as ReactDOM from 'react-dom/client'
import { LessonBody, LessonCard } from '~/Lesson'
import { ShippingForm } from './ShippingForm'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <LessonBody>
    <LessonCard className="w-96">
      <ShippingForm />
    </LessonCard>
  </LessonBody>
)
