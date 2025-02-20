import * as ReactDOM from 'react-dom/client'
import { LessonBody, LessonCard } from '~/Lesson'

// Practice 1
// import { Clipboard } from './Clipboard.final'
import { Clipboard } from './Clipboard'

// Practice 2
// import { LocalStorage } from './LocalStorage.final'
import { LocalStorage } from './LocalStorage'

function App() {
  return (
    <div className="space-y-6">
      <LessonCard>
        <Clipboard />
      </LessonCard>
      <LessonCard>
        <LocalStorage />
      </LessonCard>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <LessonBody>
    <App />
  </LessonBody>
)
