import { useState, useRef, useEffect } from 'react'
import * as ReactDOM from 'react-dom/client'
// import { Page } from './TwitterFeed.final'
import { Page } from './TwitterFeed'
import { LessonBody, LessonCard } from '~/Lesson'

function App() {
  const [mountPage, setMountPage] = useState(true)
  const [theme, setTheme] = useState('light')

  return (
    <LessonBody>
      <LessonCard>
        <div className="space-x-3">
          <button onClick={() => setMountPage(!mountPage)} className="button">
            Mount Page: {mountPage ? 'On' : 'Off'}
          </button>
          <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="button">
            Theme
          </button>
        </div>
        {mountPage && <Page theme={theme} />}
      </LessonCard>
    </LessonBody>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
