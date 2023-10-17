import { useState, useRef, useEffect, useMemo } from 'react'
import * as ReactDOM from 'react-dom/client'
// import { Page } from './TwitterFeed.final'
import { Page } from './TwitterFeed'
import { LessonBody, LessonCard } from '~/Lesson'

function App() {
  const [mountPage, setMountPage] = useState(true)
  const [theme, setTheme] = useState('light')

  const options = useMemo(() => {
    return { theme }
  }, [theme])

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
        {mountPage && <Page options={options} />}
      </LessonCard>
    </LessonBody>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
