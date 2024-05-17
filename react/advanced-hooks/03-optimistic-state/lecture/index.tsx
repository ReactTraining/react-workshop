import * as ReactDOM from 'react-dom/client'
import { LessonBody, LessonCard } from '~/Lesson'
import { AddToCart } from './AddToCart'

function App() {
  return (
    <LessonBody>
      <LessonCard>
        <AddToCart />
      </LessonCard>
    </LessonBody>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
