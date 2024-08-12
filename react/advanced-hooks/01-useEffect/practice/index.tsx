import * as ReactDOM from 'react-dom/client'
import { LessonBody, LessonCard } from '~/Lesson'
// import { ChatRoom } from './ChatRoom.final'
import { ChatRoom } from './ChatRoom'

function App() {
  const user = {
    id: 1,
    name: 'Brad Westfall',

    // Change the URL to be yours from GitHub or anywhere else:
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
