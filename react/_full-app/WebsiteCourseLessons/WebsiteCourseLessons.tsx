import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { api } from '~/utils/api'
import { Tiles } from 'react2/_full-app/src/Tiles'
import { Heading } from 'react2/_full-app/src/Heading'
import type { CourseWithLessons } from '~/utils/types'

export function WebsiteCourseLessons() {
  const courseSlug = useParams().courseSlug!
  const [course, setCourse] = useState<CourseWithLessons | null>(null)
  const lessons = course?.lessons

  // Load Course and Lesson Data
  useEffect(() => {
    let isCurrent = true
    api.courses.getCourse(courseSlug).then((course) => {
      if (!isCurrent) return
      setCourse(course)
    })
    return () => {
      isCurrent = false
    }
  }, [courseSlug])

  return (
    <div className="spacing">
      <Heading>{course?.name} Lessons</Heading>
      <p>
        In the workshop we'll be creating a dashboard CSS called "Course Platform". we'll be able to
        add courses and content, which is shown below. Consider the below content to be an example
        of how the CMS works and not necessarily articles you should consider to be complete and
        thorough:
      </p>
      <Tiles minSize={17}>
        {lessons?.map((lesson) => {
          return (
            <div key={lesson.id} className="card-line">
              <b className="text-large">
                <Link to={lesson.slug}>{lesson.name}</Link>
              </b>
            </div>
          )
        })}
      </Tiles>
    </div>
  )
}
