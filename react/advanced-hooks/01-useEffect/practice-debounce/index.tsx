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

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(<App />)
