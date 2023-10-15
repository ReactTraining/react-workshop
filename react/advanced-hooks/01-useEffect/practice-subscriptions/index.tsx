import * as ReactDOM from 'react-dom/client'
import { ChatRoom } from './ChatRoom'
import { LessonBody, LessonCard } from '~/Lesson'

function App() {
  const user = {
    id: 1,
    name: 'My Name',
    avatarUrl: 'default-admin.jpg',

    // Change the URL to be yours from GitHub or anywhere else:
    // avatarUrl: 'https://avatars.githubusercontent.com/u/2272118?v=4',
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
