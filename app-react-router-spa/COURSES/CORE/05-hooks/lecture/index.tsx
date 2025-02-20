import * as ReactDOM from 'react-dom/client'
import { LessonBody, LessonCard } from '~/Lesson'

// 1. useId, useRef, and useEffect
import { App } from './GoogleMaps'

// 2. Dynamic Refs, memo, useMemo, useCallback
// import { App } from './PurchaseTickets'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <LessonBody>
    <LessonCard>
      <App />
    </LessonCard>
  </LessonBody>
)
