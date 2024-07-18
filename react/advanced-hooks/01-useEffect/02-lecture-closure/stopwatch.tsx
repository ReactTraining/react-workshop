import { useState, useEffect } from 'react'
import { LessonBody, LessonCard } from '~/Lesson'

export function App() {
  const [active, setActive] = useState(false)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    if (active) {
      const id = setInterval(() => {
        console.log('Set Seconds')
        // setSeconds(0 + 1)
        setSeconds((seconds) => {
          return seconds + 1
        })
      }, 1000)
      // when we unmount
      // when the dep array changes
      return () => {
        clearInterval(id)
      }
    }
  }, [active])

  return (
    <LessonBody>
      <LessonCard>
        <div className="text-center space-y-6">
          <div className="space-x-6">
            <button className="button" onClick={() => setActive(true)}>
              Start
            </button>
            <button className="button" onClick={() => setActive(false)}>
              Stop
            </button>
          </div>
          <hr />
          <div>Seconds: {seconds}</div>
        </div>
      </LessonCard>
    </LessonBody>
  )
}
