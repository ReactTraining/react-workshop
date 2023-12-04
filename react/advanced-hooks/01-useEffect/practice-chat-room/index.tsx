import * as ReactDOM from 'react-dom/client'
import { ChatRoom } from './ChatRoom.final'
import { LessonBody, LessonCard } from '~/Lesson'

function App() {
  const user = {
    id: 1,
    name: 'Brad Westfall',
    avatarUrl: 'https://avatars.githubusercontent.com/u/2272118?v=4',
  }

  return (
    <LessonBody>
      <LessonCard>
        <ChatRoom user={user} />
      </LessonCard>
    </LessonBody>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
