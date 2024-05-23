import * as ReactDOM from 'react-dom/client'
import { useState } from 'react'
import { LessonBody } from '~/Lesson'
import { Groceries } from './Groceries'
import { Checkout } from './Checkout'

function App() {
  const [page, setPage] = useState('/')
  return (
    <div className="space-y-6">
      <div className="space-x-3 text-right">
        <button className="button inline-block" onClick={() => setPage('/')}>
          Home
        </button>
        <button className="button" onClick={() => setPage('/checkout')}>
          Checkout
        </button>
      </div>
      {page === '/' && <Groceries />}
      {page === '/checkout' && <Checkout />}
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <LessonBody>
    <App />
  </LessonBody>
)
