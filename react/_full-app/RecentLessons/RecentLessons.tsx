import { useState, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import * as localStorage from '~/utils/localStorage'
import { Heading } from '~/Heading'

type LocalStorageLesson = {
  courseSlug: string
  lessonSlug: string
  lessonName: string
}

export function RecentLessons() {
  const [recent, setRecent] = useState<LocalStorageLesson[]>([])

  useLayoutEffect(() => {
    setRecent(localStorage.getRecentLessons())
  }, [])

  return (
    <div className="spacing">
      <Heading size={2}>Recent Lessons</Heading>
      <hr />
      <div className="spacing">
        {Array.isArray(recent) &&
          recent.length > 0 &&
          recent.map((lesson) => {
            const path = `${lesson.courseSlug}/${lesson.lessonSlug}`
            return (
              <div key={path} className="spacing-small">
                <b className="block">{lesson.lessonName}</b>
                <Link to={`/admin/courses/${path}`}>{path}</Link>
              </div>
            )
          })}
      </div>
    </div>
  )
}
