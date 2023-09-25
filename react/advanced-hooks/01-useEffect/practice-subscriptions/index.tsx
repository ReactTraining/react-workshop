import * as ReactDOM from 'react-dom/client'
import { ChatRoom } from './ChatRoom.final'
import { LessonBody, LessonCard } from '~/Lesson'

function App() {
  return (
    <LessonBody>
      <LessonCard>
        <ChatRoom />
      </LessonCard>
    </LessonBody>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(<App />)
