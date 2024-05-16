import * as ReactDOM from 'react-dom/client'
// import  { ClapButton } from './ClapButton.final'
import { ClapButton } from './ClapButton'
import { LessonBody, LessonCard } from '~/Lesson'

function App() {
  return (
    <LessonBody>
      <LessonCard>
        <ClapButton />
      </LessonCard>
    </LessonBody>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
