import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from 'course-platform/utils/api'
import { Tiles } from 'course-platform/Tiles'
import { Heading } from 'course-platform/Heading'
import type { CourseWithLessons } from 'course-platform/utils/types'

export function WebsiteCourses() {
  const [courses, setCourses] = useState<CourseWithLessons[] | null>(null)

  // Get All Courses
  useEffect(() => {
    let isCurrent = true
    api.courses.getAll().then((courses) => {
      if (!isCurrent) return
      setCourses(courses)
    })
    return () => {
      isCurrent = false
    }
  }, [])

  return (
    <div className="spacing">
      <Heading>Courses</Heading>
      <p>
        In the workshop we'll be creating a dashboard CSS called "Course Platform". we'll be able to
        add courses and content, which is shown below. Consider the below content to be an example
        of how the CMS works and not necessarily articles you should consider to be complete and
        thorough:
      </p>
      <Tiles minSize={17}>
        {courses?.map((course) => {
          return (
            <div key={course.id} className="card-line">
              <b className="text-large">
                <Link to={course.slug}>{course.name}</Link>
              </b>
            </div>
          )
        })}
      </Tiles>
    </div>
  )
}
