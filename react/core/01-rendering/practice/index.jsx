import * as ReactDOM from 'react-dom/client'
import { ChatRoom } from './ChatRoom'
import { Heading } from '~/Heading'
import { LessonBody, LessonCard } from '~/Lesson'
// import { Avatar } from './Avatar.final'
import { Avatar } from './Avatar'

const user = {
  id: 1,
  name: 'Brad Westfall',
  avatarUrl: 'https://pbs.twimg.com/profile_images/1400880623649136642/5np79Fws_400x400.jpg',
}

function App() {
  return (
    <LessonBody>
      <div className="flex gap-6 max-lg:flex-col">
        <div className="lg:flex-1">
          <LessonCard>
            <Heading>Practice</Heading>
            <p>Make an avatar component. See GUIDE.md for details</p>
            <div className="m-auto w-fit flex gap-4 items-center">
              {/* Task One: Convert the img to be an Avatar component like this: */}

              <Avatar src={user.avatarUrl} />

              <img
                alt="User Avatar"
                loading="lazy"
                src={user.avatarUrl}
                style={{ width: `3em` }}
                className="aspect-square rounded-full"
              />

              <div className="text-2xl text-slate-700">{user.name}</div>
            </div>
          </LessonCard>
        </div>
        <div className="lg:flex-1">
          <LessonCard>
            <ChatRoom user={user} />
          </LessonCard>
        </div>
      </div>
    </LessonBody>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
