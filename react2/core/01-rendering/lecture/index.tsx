import * as ReactDOM from 'react-dom/client'
import { Lesson } from '~/Lesson'

function App() {
  return (
    <Lesson>
      <div>Lesson....</div>
    </Lesson>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
